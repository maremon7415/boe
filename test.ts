

// Call this function when a match finishes
export async function updatePlayerStats(userId: string, goalsScored: number, goalsConceded: number) {
    
    // 1. CALCULATE THE RESULT LOGIC
    let matchResult: "W" | "D" | "L";
    let pointsToAdd = 0;
    
    // Increment specific counters based on result
    const incUpdate: any = {
        "stats.totalMatch": 1,
        "stats.goalsFor": goalsScored,
        "stats.goalsAgainst": goalsConceded,
        "stats.goalDiff": goalsScored - goalsConceded, // Example: 3 - 1 = +2
    };

    if (goalsScored > goalsConceded) {
        matchResult = "W";
        pointsToAdd = 3;
        incUpdate["stats.win"] = 1; // Add 1 to wins
    } else if (goalsScored === goalsConceded) {
        matchResult = "D";
        pointsToAdd = 1;
        incUpdate["stats.draw"] = 1; // Add 1 to draws
    } else {
        matchResult = "L";
        pointsToAdd = 0;
        incUpdate["stats.loss"] = 1; // Add 1 to loss
    }

    // Add calculated points to the update object
    incUpdate["stats.points"] = pointsToAdd;

    // 2. UPDATE DATABASE ATOMICALLY
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $inc: incUpdate, // Increment numbers
            $push: {
                "stats.form": {
                    $each: [matchResult], // Push "W", "L", or "D"
                    $slice: -5 // Keep only the last 5 matches
                }
            }
        },
        { new: true } // Return the updated document
    );

    return updatedUser;
}

export async function getLeaderboard() {
    // -1 means Descending (Highest to Lowest)
    const leaderboard = await User.find({})
        .select("fullName avatar stats") // Select only fields you need
        .sort({ 
            "stats.points": -1,   // Primary Sort: Most Points
            "stats.goalDiff": -1, // Tie-Breaker 1: Best Goal Difference
            "stats.goalsFor": -1  // Tie-Breaker 2: Most Goals Scored
        })
        .limit(50); // Limit to top 50 players

    return leaderboard;
}