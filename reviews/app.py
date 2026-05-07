from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database()
reviews_col = db.reviews

# 1. Create Review & Rating
@app.route('/api/reviews', methods=['POST'])
def create_review():
    data = request.json
    # Expected fields: target_id (Caregiver/Agency ID), user_name, comment, rating
    new_review = {
        "target_id": data.get("target_id"),
        "user_name": data.get("user_name"),
        "comment": data.get("comment"),
        "rating": data.get("rating"), # Numeric 1-5
        "created_at": data.get("created_at")
    }
    result = reviews_col.insert_one(new_review)
    return jsonify({"message": "Review added", "id": str(result.inserted_id)}), 201

# 2. Read All Reviews for a specific Caregiver or Agency
@app.route('/api/reviews/target/<target_id>', methods=['GET'])
def get_reviews_by_target(target_id):
    reviews = list(reviews_col.find({"target_id": target_id}))
    for r in reviews:
        r['_id'] = str(r['_id'])
    return jsonify(reviews), 200

# 3. Update Review or Rating
@app.route('/api/reviews/<review_id>', methods=['PUT'])
def update_review(review_id):
    data = request.json
    reviews_col.update_one({"_id": ObjectId(review_id)}, {"$set": data})
    return jsonify({"message": "Review updated"}), 200

# 4. Delete Review
@app.route('/api/reviews/<review_id>', methods=['DELETE'])
def delete_review(review_id):
    reviews_col.delete_one({"_id": ObjectId(review_id)})
    return jsonify({"message": "Review deleted"}), 200

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5002))
    app.run(host='0.0.0.0', port=port, debug=True)