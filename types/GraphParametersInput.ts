import React from "react"

export type GraphParametersInput = {
    summaryKey: string,
    setSummaryKey: React.Dispatch<React.SetStateAction<string>>,
    dateKey: string,
    setDateKey: React.Dispatch<React.SetStateAction<string>>,
}