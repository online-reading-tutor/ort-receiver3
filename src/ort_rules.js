// Input keys
const IK_SUMMARY_MESSAGE = 'summaryMessage';
const IK_FREE_TRIAL = 'freeTrial';
const IK_CONTACT_METHOD = 'contactMethod';
const IK_RESULTS = 'results';
const IK_SUMMARY_SCORE = 'summaryScore';

// Output keys
const OK_AT_RISK_FLAG = 'atRiskFlag';
const OK_FREE_TRIAL_FLAG = 'freeTrialFlag';
const OK_WILL_CONTACT_METHOD = 'willContactMethod';

const IK_SUMMARIES = 'summaries';

const OrtRules = [
    {
        condition: (wm) => IK_SUMMARY_SCORE in wm,
        consequence: (wm) => {
            wm[IK_SUMMARY_SCORE] = Math.round(wm[IK_SUMMARY_SCORE]);
        }
    },
    {
        condition: (wm) => IK_SUMMARY_MESSAGE in wm,
        consequence: (wm) => {
            wm[OK_AT_RISK_FLAG] = wm[IK_SUMMARY_MESSAGE] === 'At Risk';
        }
    },
    {
        condition: (wm) => IK_FREE_TRIAL in wm,
        consequence: (wm) => {
            wm[OK_FREE_TRIAL_FLAG] = wm[IK_FREE_TRIAL].toUpperCase() === 'YES';
        }
    },
    {
        condition: (wm) => OK_FREE_TRIAL_FLAG in wm && IK_CONTACT_METHOD,
        consequence: (wm) => {
            if (wm[IK_CONTACT_METHOD].match(/phone/)) {
                wm[OK_WILL_CONTACT_METHOD] = 'phone';
            } else {
                wm[OK_WILL_CONTACT_METHOD] = 'email';
            }
        }
    },
    {
        condition: (wm) => IK_RESULTS in wm && IK_SUMMARIES in wm,
        consequence: (wm) => {
            let summaries = wm[IK_SUMMARIES];
            let results = wm[IK_RESULTS];

            results.forEach((section, i) => {
                section.message = summaries[i].message;
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
                section.percent = summaries[i].score;
            });
        }
    },
    {
        condition: (wm) => IK_RESULTS in wm,
        consequence: (wm) => {
            let results = wm[IK_RESULTS];
            results.forEach((section, i) => {
                section.elapsedTime = section.responses.reduce((total, r) => total + r.responseTime, 0);
                section.total = section.responses.length;
                section.average = Math.round(elapsedTime / section.total);
            });
        }
    },
    {
        condition: (wm) => IK_SUMMARIES in wm,
        consequence: (wm) => {
            let summaries = wm[IK_SUMMARIES];
            summaries.forEach(summary => {
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