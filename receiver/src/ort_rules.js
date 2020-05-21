const OrtRules = [
    {
        condition: (wm) => 'summaryScore' in wm,
        consequence: (wm) => wm.summaryScore = Math.round(wm.summaryScore)
    },
    {
        condition: (wm) => 'summaryMessage' in wm,
        consequence: (wm) => wm.atRiskFlag = wm.summaryMessage === 'At Risk'
    },
    {
        condition: (wm) => 'freeTrial' in wm,
        consequence: (wm) => wm.freeTrialFlag = wm.freeTrial.toUpperCase() === 'YES'
    },
    {
        condition: (wm) => 'freeTrialFlag' in wm && 'contactMethod' in wm,
        consequence: (wm) => wm.willContactMethod = wm.contactMethod.match(/phone/) ? 'phone' : 'email'
    },
    {
        condition: (wm) => 'results' in wm && 'summaries' in wm,
        consequence: (wm) => {
            wm.results.forEach((section, i) => {
                section.message = wm.summaries[i].message;
                let count = 0;
                section.responses.forEach(response => {
                    if (response.correct) count++;
                    response.color = response.correct ? '#080' : '#800';
                    if (!response.correct) {
                        if (response.answer) {
                            let foundType = 0;
                            response.subject.alternates.forEach(alternate => {
                                if (alternate.label === response.answer) foundType = alternate.type;
                            });
                            response.correctLabel = foundType === 1 ? 'Auditory' : 'Visual';
                        } else {
                            response.correctLabel = 'Timeout';
                        }
                    }
                });
                section.count = count;
                section.percent = wm.summaries[i].score;
            });
        }
    },
    {
        condition: (wm) => 'results' in wm,
        consequence: (wm) => {
            wm.results.forEach((section, i) => {
                section.elapsedTime = section.responses.reduce((total, r) => total + r.responseTime, 0);
                section.total = section.responses.length;
                section.average = Math.round(section.elapsedTime / section.total);
            });
        }
    },
    {
        condition: (wm) => 'summaries' in wm,
        consequence: (wm) => {
            wm.summaries.forEach(summary => {
                let visual = summary.visual;
                let auditory = summary.auditory;
                if (visual + auditory > 0) {
                    summary.visualScore = `${Math.round(visual / (visual + auditory) * 100)}%`;
                    summary.auditoryScore = `${Math.round(auditory / (visual + auditory) * 100)}%`;
                } else {
                    summary.visualScore = "-";
                    summary.auditoryScore = "-";
                }
            });
        }
    }
];

module.exports = OrtRules;