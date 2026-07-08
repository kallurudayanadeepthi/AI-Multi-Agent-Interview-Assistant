from fastapi import APIRouter, HTTPException
from ...database.mongodb import interviews_collection
from ...agents.feedback_agent import generate_feedback
from ...agents.study_plan_agent import generate_study_plan

router = APIRouter()

@router.get("/feedback/{interview_id}")
async def get_feedback(interview_id: str):
    interview = interviews_collection.find_one({"interview_id": interview_id})
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
        
    scores_dict = interview.get("scores", {})
    if not scores_dict:
        raise HTTPException(status_code=400, detail="No answers have been evaluated yet")
        
    # Convert scores dictionary to list of evaluations
    evaluations = list(scores_dict.values())
    
    # 1. Generate Final Feedback
    feedback = generate_feedback(evaluations)
    
    # 2. Generate Study Plan
    study_plan = generate_study_plan(feedback, interview.get("job_role", "Unknown Role"))
    
    # Save back to DB
    interviews_collection.update_one(
        {"interview_id": interview_id},
        {"$set": {
            "feedback": feedback,
            "study_plan": study_plan
        }}
    )
    
    # Remove _id from response for JSON serialization safety if we returned the whole object
    return {
        "status": "success",
        "feedback": feedback,
        "study_plan": study_plan,
        "questions": interview.get("questions", []),
        "answers": interview.get("answers", []),
        "scores": interview.get("scores", {})
    }
