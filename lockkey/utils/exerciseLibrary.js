export function getTierContent(zone, tier, location = null, trigger = null) {
  const LIBRARY = {
    Spine: {
      default: {
        1: {
          title: "Spine — Tier 1",
          summary: "Reduce tone and stiffness through quick downregulation where appropriate.",
          exercises: [
            "Thoracic SMFR on roller — 30 to 45 seconds",
            "90/90 breathing — 5 slow breaths",
            "Cat-cow — 6 reps",
          ],
        },
        2: {
          title: "Spine — Tier 2",
          summary: "Restore spinal mobility and movement options.",
          exercises: [
            "Open book rotation — 6 reps per side",
            "Quadruped thread the needle — 6 reps per side",
            "Half-kneeling hip flexor stretch — 30 seconds per side",
          ],
        },
        3: {
          title: "Spine — Tier 3",
          summary: "Build trunk control and integrate into stable movement.",
          exercises: [
            "Dead bug — 6 reps per side",
            "Bird dog — 6 reps per side",
            "Suitcase carry — 20 to 30 seconds per side",
          ],
        },
      },
      Back: {
        Flexion: {
          1: {
            title: "Spine / Back / Flexion — Tier 1",
            summary: "Calm posterior chain tone and improve tolerance to bending.",
            exercises: [
              "Thoracolumbar SMFR with roller — 30 to 45 seconds",
              "Glute SMFR — 30 seconds per side",
              "90/90 breathing — 5 slow breaths",
            ],
          },
          2: {
            title: "Spine / Back / Flexion — Tier 2",
            summary: "Restore spinal flexion tolerance and hip motion.",
            exercises: [
              "Child’s pose rockback — 6 reps",
              "Hamstring hinge reach — 30 seconds per side",
              "Open book rotation — 6 reps per side",
            ],
          },
          3: {
            title: "Spine / Back / Flexion — Tier 3",
            summary: "Rebuild flexion control through trunk and hip mechanics.",
            exercises: [
              "Dead bug — 6 reps per side",
              "Hip hinge drill — 8 reps",
              "Sit-to-stand — 8 reps",
            ],
          },
        },
      },
    },

    Shoulder: {
      default: {
        1: {
          title: "Shoulder — Tier 1",
          summary: "Reduce guarding around pecs, lats, and upper back where appropriate.",
          exercises: [
            "Lat / teres SMFR — 30 seconds per side",
            "Pec SMFR on ball — 30 seconds per side",
            "Scapular circles — 6 reps each direction",
          ],
        },
        2: {
          title: "Shoulder — Tier 2",
          summary: "Restore overhead and rotational mobility.",
          exercises: [
            "Wall slides — 8 reps",
            "Open book rotation — 6 reps per side",
            "Bench or chair lat stretch — 30 seconds",
          ],
        },
        3: {
          title: "Shoulder — Tier 3",
          summary: "Build scapular control and shoulder stability.",
          exercises: [
            "Band pull-apart — 10 reps",
            "Band external rotation — 10 reps per side",
            "Bottom-up carry or front rack carry — 20 seconds per side",
          ],
        },
      },
      Front: {
        Flexion: {
          1: {
            title: "Shoulder / Front / Flexion — Tier 1",
            summary: "Reduce anterior shoulder tone and improve flexion tolerance.",
            exercises: [
              "Pec minor / front delt SMFR — 30 seconds per side",
              "Lat SMFR — 30 seconds per side",
              "Supported arm swings — 10 reps",
            ],
          },
          2: {
            title: "Shoulder / Front / Flexion — Tier 2",
            summary: "Improve shoulder flexion and thoracic extension.",
            exercises: [
              "Wall slides — 8 reps",
              "Bench lat stretch — 30 seconds",
              "Open book rotation — 6 reps per side",
            ],
          },
          3: {
            title: "Shoulder / Front / Flexion — Tier 3",
            summary: "Rebuild overhead control.",
            exercises: [
              "Band external rotation — 10 reps",
              "Scaption raise — 8 reps",
              "Overhead carry — 20 seconds per side",
            ],
          },
        },
      },
    },

    Hip: {
      default: {
        1: {
          title: "Hip — Tier 1",
          summary: "Reduce tone through glutes, hip flexors, or adductors where appropriate.",
          exercises: [
            "Glute SMFR — 30 seconds per side",
            "TFL / lateral hip SMFR — 30 seconds per side",
            "90/90 breathing — 5 breaths",
          ],
        },
        2: {
          title: "Hip — Tier 2",
          summary: "Restore hip rotation and flexor length.",
          exercises: [
            "90/90 hip switches — 6 reps per side",
            "Half-kneeling hip flexor stretch — 30 seconds per side",
            "Figure-4 stretch — 30 seconds per side",
          ],
        },
        3: {
          title: "Hip — Tier 3",
          summary: "Build hip control in single-leg and hinge patterns.",
          exercises: [
            "Bodyweight RDL pattern — 8 reps",
            "Split squat hold — 15 to 20 seconds per side",
            "Lateral band walk — 10 steps each direction",
          ],
        },
      },
      Front: {
        Flexion: {
          1: {
            title: "Hip / Front / Flexion — Tier 1",
            summary: "Reduce hip flexor and TFL tone quickly.",
            exercises: [
              "TFL / front pocket SMFR — 30 seconds per side",
              "Quad SMFR — 30 seconds per side",
              "Supine breathing reset — 5 breaths",
            ],
          },
          2: {
            title: "Hip / Front / Flexion — Tier 2",
            summary: "Restore extension and front-hip mobility.",
            exercises: [
              "Half-kneeling hip flexor stretch — 30 seconds per side",
              "Adductor rockback — 8 reps",
              "90/90 hip switches — 6 reps per side",
            ],
          },
          3: {
            title: "Hip / Front / Flexion — Tier 3",
            summary: "Rebuild hip extension and frontal-plane control.",
            exercises: [
              "Glute bridge — 8 reps",
              "Split squat — 6 reps per side",
              "Lateral band walk — 10 steps each direction",
            ],
          },
        },
      },
    },

    Knee: {
      default: {
        1: {
          title: "Knee — Tier 1",
          summary: "Reduce local irritation and tone where quick SMFR is useful.",
          exercises: [
            "Quad SMFR — 30 seconds per side",
            "Calf SMFR — 30 seconds per side",
            "Supported terminal knee extension — 10 reps",
          ],
        },
        2: {
          title: "Knee — Tier 2",
          summary: "Restore knee and ankle mobility.",
          exercises: [
            "Knee-to-wall dorsiflexion — 8 reps per side",
            "Quad stretch — 30 seconds per side",
            "Hamstring hinge reach — 30 seconds per side",
          ],
        },
        3: {
          title: "Knee — Tier 3",
          summary: "Rebuild knee control through squat and step patterns.",
          exercises: [
            "Sit-to-stand — 8 reps",
            "Step-up or step-down — 6 reps per side",
            "Split squat — 6 reps per side",
          ],
        },
      },
      Front: {
        Flexion: {
          1: {
            title: "Knee / Front / Flexion — Tier 1",
            summary: "Reduce quad and calf tone that may limit knee flexion comfort.",
            exercises: [
              "Quad SMFR — 30 to 45 seconds per side",
              "Calf SMFR — 30 seconds per side",
              "Supported terminal knee extension — 10 reps",
            ],
          },
          2: {
            title: "Knee / Front / Flexion — Tier 2",
            summary: "Restore ankle and anterior knee mobility.",
            exercises: [
              "Knee-to-wall dorsiflexion — 8 reps per side",
              "Quad stretch — 30 seconds per side",
              "Wall-supported knee bend — 8 reps",
            ],
          },
          3: {
            title: "Knee / Front / Flexion — Tier 3",
            summary: "Rebuild controlled knee bending capacity.",
            exercises: [
              "Sit-to-stand — 8 reps",
              "Spanish squat hold — 15 seconds",
              "Step-down — 6 reps per side",
            ],
          },
        },
        Load: {
          1: {
            title: "Knee / Front / Load — Tier 1",
            summary: "Reduce front-knee tension before load reintroduction.",
            exercises: [
              "Quad SMFR — 30 seconds per side",
              "Patellar tendon unloading wall sit — 15 seconds",
              "Calf SMFR — 30 seconds per side",
            ],
          },
          2: {
            title: "Knee / Front / Load — Tier 2",
            summary: "Restore knee and ankle mechanics under load preparation.",
            exercises: [
              "Knee-to-wall dorsiflexion — 8 reps per side",
              "Split stance quad stretch — 30 seconds per side",
              "Ankle rocks — 8 reps per side",
            ],
          },
          3: {
            title: "Knee / Front / Load — Tier 3",
            summary: "Rebuild load tolerance through controlled lower-body tasks.",
            exercises: [
              "Sit-to-stand — 8 reps",
              "Step-up — 6 reps per side",
              "Split squat — 6 reps per side",
            ],
          },
        },
      },
      Back: {
        Flexion: {
          1: {
            title: "Knee / Back / Flexion — Tier 1",
            summary: "Reduce hamstring and calf tension affecting posterior knee symptoms.",
            exercises: [
              "Hamstring SMFR — 30 seconds per side",
              "Calf SMFR — 30 seconds per side",
              "Heel slide — 8 reps",
            ],
          },
          2: {
            title: "Knee / Back / Flexion — Tier 2",
            summary: "Restore posterior-chain extensibility and knee bend tolerance.",
            exercises: [
              "Hamstring hinge reach — 30 seconds per side",
              "Calf stretch — 30 seconds per side",
              "Supported heel slide — 8 reps",
            ],
          },
          3: {
            title: "Knee / Back / Flexion — Tier 3",
            summary: "Rebuild posterior knee control and lower-leg integration.",
            exercises: [
              "Bridge — 8 reps",
              "Controlled calf raise — 8 reps",
              "Step-up — 6 reps per side",
            ],
          },
        },
      },
      Inside: {
        Load: {
          1: {
            title: "Knee / Inside / Load — Tier 1",
            summary: "Reduce adductor and calf tone affecting medial knee load tolerance.",
            exercises: [
              "Adductor SMFR — 30 seconds per side",
              "Calf SMFR — 30 seconds per side",
              "Supported knee shift — 8 reps",
            ],
          },
          2: {
            title: "Knee / Inside / Load — Tier 2",
            summary: "Restore adductor length and ankle/knee motion.",
            exercises: [
              "Adductor rockback — 8 reps",
              "Knee-to-wall dorsiflexion — 8 reps per side",
              "Cossack shift stretch — 6 reps",
            ],
          },
          3: {
            title: "Knee / Inside / Load — Tier 3",
            summary: "Rebuild frontal-plane and single-leg control.",
            exercises: [
              "Lateral step-down — 6 reps per side",
              "Split squat — 6 reps per side",
              "Lateral band walk — 10 steps each direction",
            ],
          },
        },
      },
      Outside: {
        Load: {
          1: {
            title: "Knee / Outside / Load — Tier 1",
            summary: "Reduce lateral chain tone affecting knee loading.",
            exercises: [
              "TFL / lateral quad SMFR — 30 seconds per side",
              "Calf SMFR — 30 seconds per side",
              "Supported knee bend — 8 reps",
            ],
          },
          2: {
            title: "Knee / Outside / Load — Tier 2",
            summary: "Restore lateral hip and ankle mechanics.",
            exercises: [
              "Figure-4 stretch — 30 seconds per side",
              "Knee-to-wall dorsiflexion — 8 reps per side",
              "Lateral hip stretch — 30 seconds per side",
            ],
          },
          3: {
            title: "Knee / Outside / Load — Tier 3",
            summary: "Rebuild lateral chain stability under load.",
            exercises: [
              "Step-down — 6 reps per side",
              "Lateral band walk — 10 steps each direction",
              "Single-leg sit-to-stand assist — 5 reps per side",
            ],
          },
        },
      },
    },

    "Ankle / Foot": {
      default: {
        1: {
          title: "Ankle / Foot — Tier 1",
          summary: "Reduce calf and foot stiffness where quick release helps.",
          exercises: [
            "Calf SMFR — 30 seconds per side",
            "Plantar surface ball roll — 30 seconds per side",
            "Ankle circles — 6 reps each direction",
          ],
        },
        2: {
          title: "Ankle / Foot — Tier 2",
          summary: "Restore ankle mobility and foot motion.",
          exercises: [
            "Knee-to-wall dorsiflexion — 8 reps per side",
            "Calf stretch — 30 seconds per side",
            "Toe extension stretch — 20 seconds",
          ],
        },
        3: {
          title: "Ankle / Foot — Tier 3",
          summary: "Build foot-ankle stability and single-leg control.",
          exercises: [
            "Single-leg balance — 20 seconds per side",
            "Controlled calf raises — 8 reps",
            "Short-foot hold — 10 seconds x 3",
          ],
        },
      },
      Front: {
        Flexion: {
          1: {
            title: "Ankle / Front / Flexion — Tier 1",
            summary: "Reduce anterior ankle stiffness and calf restriction.",
            exercises: [
              "Calf SMFR — 30 seconds per side",
              "Shin soft tissue massage — 20 seconds",
              "Ankle circles — 6 reps each direction",
            ],
          },
          2: {
            title: "Ankle / Front / Flexion — Tier 2",
            summary: "Restore dorsiflexion and ankle bend tolerance.",
            exercises: [
              "Knee-to-wall dorsiflexion — 8 reps per side",
              "Soleus stretch — 30 seconds per side",
              "Supported ankle rocks — 8 reps",
            ],
          },
          3: {
            title: "Ankle / Front / Flexion — Tier 3",
            summary: "Rebuild front-side ankle control.",
            exercises: [
              "Controlled calf raise — 8 reps",
              "Single-leg balance — 20 seconds per side",
              "Step-over drill — 6 reps per side",
            ],
          },
        },
      },
    },

    Elbow: {
      default: {
        1: {
          title: "Elbow — Tier 1",
          summary: "Reduce forearm tension where quick release is useful.",
          exercises: [
            "Forearm extensor SMFR — 20 to 30 seconds per side",
            "Forearm flexor SMFR — 20 to 30 seconds per side",
            "Gentle wrist circles — 8 reps",
          ],
        },
        2: {
          title: "Elbow — Tier 2",
          summary: "Restore wrist and forearm mobility affecting elbow symptoms.",
          exercises: [
            "Wrist flexor stretch — 20 to 30 seconds",
            "Wrist extensor stretch — 20 to 30 seconds",
            "Pronation / supination drill — 8 reps per side",
          ],
        },
        3: {
          title: "Elbow — Tier 3",
          summary: "Build forearm capacity and upper-limb stability.",
          exercises: [
            "Hammer curl — 8 reps",
            "Band triceps pressdown — 10 reps",
            "Farmer carry — 20 seconds per side",
          ],
        },
      },
    },

    "Wrist / Hand": {
      default: {
        1: {
          title: "Wrist / Hand — Tier 1",
          summary: "Reduce wrist and palm stiffness where quick release helps.",
          exercises: [
            "Forearm flexor SMFR — 20 seconds",
            "Forearm extensor SMFR — 20 seconds",
            "Wrist circles — 8 reps each direction",
          ],
        },
        2: {
          title: "Wrist / Hand — Tier 2",
          summary: "Restore wrist extension, flexion, and hand mobility.",
          exercises: [
            "Wrist extension stretch — 20 to 30 seconds",
            "Prayer stretch — 20 seconds",
            "Reverse prayer stretch — 20 seconds",
          ],
        },
        3: {
          title: "Wrist / Hand — Tier 3",
          summary: "Build grip and wrist stability.",
          exercises: [
            "Quadruped wrist rock — 8 reps",
            "Grip crush hold — 10 seconds x 3",
            "Farmer carry — 20 seconds per side",
          ],
        },
      },
    },
  };

  const zoneData = LIBRARY[zone];

  if (!zoneData) {
    return {
      title: `${zone} — Tier ${tier}`,
      summary: "No protocol found for this zone yet.",
      exercises: ["No exercises assigned yet."],
    };
  }

  const match =
    (location && trigger && zoneData?.[location]?.[trigger]?.[tier]) ||
    zoneData?.default?.[tier];

  if (!match) {
    return {
      title: `${zone} — Tier ${tier}`,
      summary: "No protocol found for this zone/tier yet.",
      exercises: ["No exercises assigned yet."],
    };
  }

  return match;
}