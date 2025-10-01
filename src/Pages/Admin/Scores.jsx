import {useEffect,useMemo, useState} from "react-router-dom"
import { getScore, getScores,postScore, updateScore,deleteScore} from "../../API/scores"

export default function scoresAdmin (){
    const empty = {
        title:"",
        composer_id: "",
        instrument_id: "",
        file_path: "",
        file_type: ""
    }
}