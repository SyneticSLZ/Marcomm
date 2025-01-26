import { createCharts } from './charts.js';

function renderStrategicAnalysis() {
    

const data = [
    {
    title: "GROUP 1 - CUSTOM IN-THE-EAR HEARING AIDS",
    monthly_data: {
      "OCT 2023": {
        sales: {
          "GN Resound": 53700.40,
          "Oticon": 86403.20,
          "WS Audiology": 23342.80,
          "Sonova/Phonak": 560764.88,
          "Starkey": 264725.50
        },
        sales_percentage: {
          "GN Resound": 5.43,
          "Oticon": 8.74,
          "WS Audiology": 2.36,
          "Sonova/Phonak": 56.70,
          "Starkey": 26.77
        },
        units_sold: {
          "GN Resound": 149,
          "Oticon": 246,
          "WS Audiology": 67,
          "Sonova/Phonak": 1502,
          "Starkey": 719
        },
        average_cost: {
          "GN Resound": 360.41,
          "Oticon": 351.23,
          "WS Audiology": 348.40,
          "Sonova/Phonak": 373.35,
          "Starkey": 368.19
        }
      },
      "NOV 2023": {
        sales: {
          "GN Resound": 94244.80,
          "Oticon": 69331.60,
          "WS Audiology": 18813.60,
          "Sonova/Phonak": 479699.40,
          "Starkey": 273226.20
        },
        sales_percentage: {
          "GN Resound": 10.08,
          "Oticon": 7.41,
          "WS Audiology": 2.01,
          "Sonova/Phonak": 51.29,
          "Starkey": 29.21
        },
        units_sold: {
          "GN Resound": 257,
          "Oticon": 199,
          "WS Audiology": 54,
          "Sonova/Phonak": 1286,
          "Starkey": 737
        },
        average_cost: {
          "GN Resound": 366.71,
          "Oticon": 348.40,
          "WS Audiology": 348.40,
          "Sonova/Phonak": 373.02,
          "Starkey": 370.73
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 147945.20,
        "Oticon": 155734.80,
        "WS Audiology": 42156.40,
        "Sonova/Phonak": 1040464.28,
        "Starkey": 537951.70
      },
      units_sold: {
        "GN Resound": 406,
        "Oticon": 445,
        "WS Audiology": 121,
        "Sonova/Phonak": 2788,
        "Starkey": 1456
      },
      average_cost: {
        "GN Resound": 364.40,
        "Oticon": 349.97,
        "WS Audiology": 348.40,
        "Sonova/Phonak": 373.19,
        "Starkey": 369.47
      }
    }
  },
  {
    title: "GROUP 1 - RECHARGEABLE CUSTOM IN-THE-EAR HEARING AIDS",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "GN Resound": 313404.00,
          "WS Audiology": 497437.20,
          "Starkey": 3603600.00
        },
        sales_percentage: {
          "GN Resound": 7.10,
          "WS Audiology": 11.27,
          "Starkey": 81.63
        },
        units_sold: {
          "GN Resound": 733,
          "WS Audiology": 1053,
          "Starkey": 7856
        },
        average_cost: {
          "GN Resound": 427.56,
          "WS Audiology": 472.40,
          "Starkey": 458.71
        }
      },
      "NOV 2024": {
        sales: {
          "GN Resound": 256266.40,
          "WS Audiology": 479486.00,
          "Starkey": 3453964.80
        },
        sales_percentage: {
          "GN Resound": 6.12,
          "WS Audiology": 11.44,
          "Starkey": 82.44
        },
        units_sold: {
          "GN Resound": 601,
          "WS Audiology": 1013,
          "Starkey": 7515
        },
        average_cost: {
          "GN Resound": 426.40,
          "WS Audiology": 473.33,
          "Starkey": 459.61
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 569670.40,
        "WS Audiology": 976923.20,
        "Starkey": 7057564.80,
        "total": 8604158.40
      },
      units_sold: {
        "GN Resound": 1334,
        "WS Audiology": 2066,
        "Starkey": 15371,
        "total": 18771
      },
      average_cost: {
        "GN Resound": 427.04,
        "WS Audiology": 472.86,
        "Starkey": 459.15,
        "overall": 458.38
      }
    }
  },{
    title: "GROUP 2 BEHIND-THE-EAR HEARING AIDS - Non-Rechargeable",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "GN Resound": 32650.80,
          "Oticon": 50132.16,
          "WS Audiology": 1865.76,
          "Sonova/Phonak": 226378.32,
          "Starkey": 15237.04
        },
        sales_percentage: {
          "GN Resound": 10.01,
          "Oticon": 15.37,
          "WS Audiology": 0.57,
          "Sonova/Phonak": 69.38,
          "Starkey": 4.67
        },
        units_sold: {
          "GN Resound": 89,
          "Oticon": 152,
          "WS Audiology": 6,
          "Sonova/Phonak": 657,
          "Starkey": 49
        },
        average_cost: {
          "GN Resound": 366.86,
          "Oticon": 329.82,
          "WS Audiology": 310.96,
          "Sonova/Phonak": 344.56,
          "Starkey": 310.96
        }
      },
      "NOV 2024": {
        sales: {
          "GN Resound": 24757.20,
          "Oticon": 40491.36,
          "WS Audiology": 4353.44,
          "Sonova/Phonak": 176492.52,
          "Starkey": 14615.12
        },
        sales_percentage: {
          "GN Resound": 9.50,
          "Oticon": 15.53,
          "WS Audiology": 1.67,
          "Sonova/Phonak": 67.70,
          "Starkey": 5.61
        },
        units_sold: {
          "GN Resound": 69,
          "Oticon": 126,
          "WS Audiology": 14,
          "Sonova/Phonak": 512,
          "Starkey": 46
        },
        average_cost: {
          "GN Resound": 358.80,
          "Oticon": 321.36,
          "WS Audiology": 310.96,
          "Sonova/Phonak": 344.71,
          "Starkey": 317.72
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 57408.00,
        "Oticon": 90623.52,
        "WS Audiology": 6219.20,
        "Sonova/Phonak": 402870.84,
        "Starkey": 29852.16,
        "total": 586973.72
      },
      units_sold: {
        "GN Resound": 158,
        "Oticon": 278,
        "WS Audiology": 20,
        "Sonova/Phonak": 1169,
        "Starkey": 95,
        "total": 1720
      },
      average_cost: {
        "GN Resound": 363.34,
        "Oticon": 325.98,
        "WS Audiology": 310.96,
        "Sonova/Phonak": 344.63,
        "Starkey": 314.23,
        "overall": 341.26
      }
    }
  },{
    title: "GROUP 3 RECEIVER-IN-THE-CANAL HEARING AIDS - Non-Rechargeable",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "GN Resound": 205365.68,
          "Oticon": 188697.60,
          "WS Audiology": 61152.00,
          "Sonova/Phonak": 788943.36,
          "Starkey": 63598.08
        },
        sales_percentage: {
          "GN Resound": 15.70,
          "Oticon": 14.43,
          "WS Audiology": 4.68,
          "Sonova/Phonak": 60.33,
          "Starkey": 4.86
        },
        units_sold: {
          "GN Resound": 537,
          "Oticon": 529,
          "WS Audiology": 175,
          "Sonova/Phonak": 2057,
          "Starkey": 182
        },
        average_cost: {
          "GN Resound": 382.43,
          "Oticon": 356.71,
          "WS Audiology": 349.44,
          "Sonova/Phonak": 383.54,
          "Starkey": 349.44
        }
      },
      "NOV 2024": {
        sales: {
          "GN Resound": 189221.76,
          "Oticon": 171575.04,
          "WS Audiology": 44728.32,
          "Sonova/Phonak": 550043.36,
          "Starkey": 67441.92
        },
        sales_percentage: {
          "GN Resound": 18.50,
          "Oticon": 16.77,
          "WS Audiology": 4.37,
          "Sonova/Phonak": 53.77,
          "Starkey": 6.59
        },
        units_sold: {
          "GN Resound": 494,
          "Oticon": 487,
          "WS Audiology": 128,
          "Sonova/Phonak": 1439,
          "Starkey": 191
        },
        average_cost: {
          "GN Resound": 383.04,
          "Oticon": 352.31,
          "WS Audiology": 349.44,
          "Sonova/Phonak": 382.24,
          "Starkey": 353.10
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 394587.44,
        "Oticon": 360272.64,
        "WS Audiology": 105880.32,
        "Sonova/Phonak": 1338986.72,
        "Starkey": 131040.00,
        "total": 2330767.12
      },
      units_sold: {
        "GN Resound": 1031,
        "Oticon": 1016,
        "WS Audiology": 303,
        "Sonova/Phonak": 3496,
        "Starkey": 373,
        "total": 6219
      },
      average_cost: {
        "GN Resound": 382.72,
        "Oticon": 354.60,
        "WS Audiology": 349.44,
        "Sonova/Phonak": 383.01,
        "Starkey": 351.31,
        "overall": 374.78
      }
    }
  },{
    title: "GROUP 2- CATEGORY 2 - BTE RECHARGABLE",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "GN Resound": 79263.90,
          "Oticon": 22896.90,
          "WS Audiology": 25213.76,
          "Sonova/Phonak": 154435.89,
          "Starkey": 17035.20
        },
        sales_percentage: {
          "GN Resound": 26.52,
          "Oticon": 7.66,
          "WS Audiology": 8.44,
          "Sonova/Phonak": 51.68,
          "Starkey": 5.70
        },
        units_sold: {
          "GN Resound": 186,
          "Oticon": 57,
          "WS Audiology": 58,
          "Sonova/Phonak": 329,
          "Starkey": 39
        },
        average_cost: {
          "GN Resound": 426.15,
          "Oticon": 401.70,
          "WS Audiology": 434.72,
          "Sonova/Phonak": 469.41,
          "Starkey": 436.80
        }
      },
      "NOV 2024": {
        sales: {
          "GN Resound": 78837.75,
          "Oticon": 13657.80,
          "WS Audiology": 36081.76,
          "Sonova/Phonak": 120638.37,
          "Starkey": 21403.20
        },
        sales_percentage: {
          "GN Resound": 29.13,
          "Oticon": 5.05,
          "WS Audiology": 13.33,
          "Sonova/Phonak": 44.58,
          "Starkey": 7.91
        },
        units_sold: {
          "GN Resound": 185,
          "Oticon": 34,
          "WS Audiology": 83,
          "Sonova/Phonak": 257,
          "Starkey": 49
        },
        average_cost: {
          "GN Resound": 426.15,
          "Oticon": 401.70,
          "WS Audiology": 434.72,
          "Sonova/Phonak": 469.41,
          "Starkey": 436.80
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 158101.65,
        "Oticon": 36554.70,
        "WS Audiology": 61295.52,
        "Sonova/Phonak": 275074.26,
        "Starkey": 38438.40,
        "total": 569464.53
      },
      units_sold: {
        "GN Resound": 371,
        "Oticon": 91,
        "WS Audiology": 141,
        "Sonova/Phonak": 586,
        "Starkey": 88,
        "total": 1277
      },
      average_cost: {
        "GN Resound": 426.15,
        "Oticon": 401.70,
        "WS Audiology": 434.72,
        "Sonova/Phonak": 469.41,
        "Starkey": 436.80,
        "overall": 445.94
      }
    }
  },{
    title: "GROUP 7 - WIRELESS CROS TRANSMITTERS - RECHARGEABLE",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "GN Resound": 27813.00,
          "Oticon": 68845.92,
          "WS Audiology": 34008.00,
          "Sonova/Phonak": 152233.20,
          "Starkey": 37128.00
        },
        sales_percentage: {
          "GN Resound": 8.69,
          "Oticon": 21.51,
          "WS Audiology": 10.63,
          "Sonova/Phonak": 47.57,
          "Starkey": 11.60
        },
        units_sold: {
          "GN Resound": 73,
          "Oticon": 174,
          "WS Audiology": 109,
          "Sonova/Phonak": 389,
          "Starkey": 118
        },
        average_cost: {
          "GN Resound": 381.00,
          "Oticon": 395.67,
          "WS Audiology": 312.00,
          "Sonova/Phonak": 391.34,
          "Starkey": 314.64
        }
      },
      "NOV 2024": {
        sales: {
          "GN Resound": 24003.00,
          "Oticon": 54065.44,
          "WS Audiology": 33072.00,
          "Sonova/Phonak": 217087.65,
          "Starkey": 29640.00
        },
        sales_percentage: {
          "GN Resound": 6.71,
          "Oticon": 15.11,
          "WS Audiology": 9.24,
          "Sonova/Phonak": 60.66,
          "Starkey": 8.28
        },
        units_sold: {
          "GN Resound": 62,
          "Oticon": 138,
          "WS Audiology": 106,
          "Sonova/Phonak": 557,
          "Starkey": 94
        },
        average_cost: {
          "GN Resound": 387.15,
          "Oticon": 391.78,
          "WS Audiology": 312.00,
          "Sonova/Phonak": 389.74,
          "Starkey": 315.32
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 51816.00,
        "Oticon": 122911.36,
        "WS Audiology": 67080.00,
        "Sonova/Phonak": 369320.85,
        "Starkey": 66768.00,
        "total": 626080.21
      },
      units_sold: {
        "GN Resound": 76,
        "Oticon": 312,
        "WS Audiology": 215,
        "Sonova/Phonak": 946,
        "Starkey": 212,
        "total": 1761
      },
      average_cost: {
        "GN Resound": 681.79,
        "Oticon": 393.95,
        "WS Audiology": 312.00,
        "Sonova/Phonak": 390.40,
        "Starkey": 314.94,
        "overall": 355.53
      }
    }
  },{
    title: "GROUP 7 - WIRELESS CROS TRANSMITTERS - NON-RECHARGEABLE",
    monthly_data: {
      "OCT 2024": {
        sales: {
            
          "Oticon": 5908.24,
          "WS Audiology": 2103.15,
          "Sonova/Phonak": 28361.76,
          "Starkey": 1802.70
        },
        sales_percentage: {
          "Oticon": 15.48,
          "WS Audiology": 5.51,
          "Sonova/Phonak": 74.29,
          "Starkey": 4.72
        },
        units_sold: {
          "Oticon": 18,
          "WS Audiology": 7,
          "Sonova/Phonak": 91,
          "Starkey": 6
        },
        average_cost: {
          "Oticon": 328.24,
          "WS Audiology": 300.45,
          "Sonova/Phonak": 311.67,
          "Starkey": 300.45
        }
      },
      "NOV 2024": {
        sales: {
          "Oticon": 6219.20,
          "WS Audiology": 1802.70,
          "Sonova/Phonak": 16955.40,
          "Starkey": 4206.30
        },
        sales_percentage: {
          "Oticon": 21.31,
          "WS Audiology": 6.18,
          "Sonova/Phonak": 58.10,
          "Starkey": 14.41
        },
        units_sold: {
          "Oticon": 20,
          "WS Audiology": 6,
          "Sonova/Phonak": 55,
          "Starkey": 13
        },
        average_cost: {
          "Oticon": 310.96,
          "WS Audiology": 300.45,
          "Sonova/Phonak": 308.28,
          "Starkey": 323.56
        }
      }
    },
    totals: {
      sales: {
        "Oticon": 12127.44,
        "WS Audiology": 3905.85,
        "Sonova/Phonak": 45317.16,
        "Starkey": 6009.00,
        "total": 67359.45
      },
      units_sold: {
        "Oticon": 38,
        "WS Audiology": 13,
        "Sonova/Phonak": 146,
        "Starkey": 19,
        "total": 216
      },
      average_cost: {
        "Oticon": 319.14,
        "WS Audiology": 300.45,
        "Sonova/Phonak": 310.39,
        "Starkey": 316.26,
        "overall": 311.85
      }
    }
  },{
    title: "GROUP 8 - WIRELESS CROS TRANSMITTERS - RECHARGEABLE",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "Sonova/Phonak": 20298.36
        },
        sales_percentage: {
          "Sonova/Phonak": 100.00
        },
        units_sold: {
          "Sonova/Phonak": 59
        },
        average_cost: {
          "Sonova/Phonak": 344.04
        }
      },
      "NOV 2024": {
        sales: {
          "Sonova/Phonak": 24082.80
        },
        sales_percentage: {
          "Sonova/Phonak": 100.00
        },
        units_sold: {
          "Sonova/Phonak": 68
        },
        average_cost: {
          "Sonova/Phonak": 354.16
        }
      }
    },
    totals: {
      sales: {
        "Sonova/Phonak": 44381.16,
        "total": 44381.16
      },
      units_sold: {
        "Sonova/Phonak": 127,
        "total": 127
      },
      average_cost: {
        "Sonova/Phonak": 349.46,
        "overall": 349.46
      }
    }
  },{
    title: "GROUP 3 CATEGORY 2 - RIC - RECHARGEABLE",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "GN Resound": 3196577.00,
          "Oticon": 6726720.00,
          "WS Audiology": 2042040.00,
          "Sonova/Phonak": 15076008.64,
          "Starkey": 1269340.80
        },
        sales_percentage: {
          "GN Resound": 11.29,
          "Oticon": 23.76,
          "WS Audiology": 7.21,
          "Sonova/Phonak": 53.25,
          "Starkey": 4.48
        },
        units_sold: {
          "GN Resound": 6784,
          "Oticon": 15356,
          "WS Audiology": 4664,
          "Sonova/Phonak": 31829,
          "Starkey": 2896
        },
        average_cost: {
          "GN Resound": 471.19,
          "Oticon": 438.05,
          "WS Audiology": 437.83,
          "Sonova/Phonak": 473.66,
          "Starkey": 438.31
        }
      },
      "NOV 2024": {
        sales: {
          "GN Resound": 2803709.50,
          "Oticon": 6061473.60,
          "WS Audiology": 1879550.40,
          "Sonova/Phonak": 15980909.56,
          "Starkey": 1350148.80
        },
        sales_percentage: {
          "GN Resound": 9.99,
          "Oticon": 21.59,
          "WS Audiology": 6.69,
          "Sonova/Phonak": 56.92,
          "Starkey": 4.81
        },
        units_sold: {
          "GN Resound": 5949,
          "Oticon": 13846,
          "WS Audiology": 4292,
          "Sonova/Phonak": 33761,
          "Starkey": 3069
        },
        average_cost: {
          "GN Resound": 471.29,
          "Oticon": 437.78,
          "WS Audiology": 437.92,
          "Sonova/Phonak": 473.35,
          "Starkey": 439.93
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 6000286.50,
        "Oticon": 12788193.60,
        "WS Audiology": 3921590.40,
        "Sonova/Phonak": 31056918.20,
        "Starkey": 2619489.60,
        "total": 56386478.30
      },
      units_sold: {
        "GN Resound": 12733,
        "Oticon": 29202,
        "WS Audiology": 8956,
        "Sonova/Phonak": 65590,
        "Starkey": 5965,
        "total": 122446
      },
      average_cost: {
        "GN Resound": 471.24,
        "Oticon": 437.92,
        "WS Audiology": 437.87,
        "Sonova/Phonak": 473.50,
        "Starkey": 439.14,
        "overall": 460.50
      }
    }
  },
  {
    title: "Standard Wireless",
    monthly_data: {
      
      "OCT 2024": {
        sales: {
          "GN Resound": 164990.80,
          "Oticon": 158343.02,
          "WS Audiology": 49320.96,
          "Sonova/Phonak": 459530.24,
          "Starkey": 213519.98
        },
        units_sold: {
          "GN Resound": 1044,
          "Oticon": 1558,
          "WS Audiology": 493,
          "Sonova/Phonak": 3132,
          "Starkey": 1316
        }
      },
      "NOV 2024": {
        sales: {
          "GN Resound": 154746.80,
          "Oticon": 139841.35,
          "WS Audiology": 48622.08,
          "Sonova/Phonak": 446403.36,
          "Starkey": 196280.64
        },
        units_sold: {
          "GN Resound": 968,
          "Oticon": 1379,
          "WS Audiology": 485,
          "Sonova/Phonak": 3067,
          "Starkey": 1158
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 319737.60,
        "Oticon": 298184.37,
        "WS Audiology": 97943.04,
        "Sonova/Phonak": 905933.60,
        "Starkey": 409800.62,
        "total": 2031599.23
      },
      units_sold: {
        "GN Resound": 2012,
        "Oticon": 2937,
        "WS Audiology": 978,
        "Sonova/Phonak": 6199,
        "Starkey": 2474,
        "total": 14600
      }
    }
  },{
    title: "Wireless FM",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "Oticon": 106667.60,
          "Sonova/Phonak": 1426831.68
        },
        units_sold: {
          "Oticon": 278,
          "Sonova/Phonak": 1912
        }
      },
      "NOV 2024": {
        sales: {
          "Oticon": 115398.40,
          "Sonova/Phonak": 1486185.64
        },
        units_sold: {
          "Oticon": 303,
          "Sonova/Phonak": 1993
        }
      }
    },
    totals: {
      sales: {
        "Oticon": 222066.00,
        "Sonova/Phonak": 2913017.32,
        "total": 3135083.32
      },
      units_sold: {
        "Oticon": 581,
        "Sonova/Phonak": 3905,
        "total": 4486
      }
    }
  },
  
  
  
  {
    title: "GROUP 6 REMOTE CONTROLS",
    monthly_data: {
      "OCT 2024": {
        sales: {
          "GN Resound": 45797.44,
          "Oticon": 59608.64,
          "WS Audiology": 21936.72,
          "Sonova/Phonak": 175158.72,
          "Starkey": 153094.24
        },
        sales_percentage: {
          "GN Resound": 10.05,
          "Oticon": 13.08,
          "WS Audiology": 4.81,
          "Sonova/Phonak": 38.45,
          "Starkey": 33.60
        },
        units_sold: {
          "GN Resound": 401,
          "Oticon": 643,
          "WS Audiology": 236,
          "Sonova/Phonak": 1736,
          "Starkey": 1643
        },
        average_cost: {
          "GN Resound": 114.21,
          "Oticon": 92.70,
          "WS Audiology": 92.95,
          "Sonova/Phonak": 100.90,
          "Starkey": 93.18
        }
      },
      "NOV 2024": {
        sales: {
          "GN Resound": 38655.76,
          "Oticon": 53684.80,
          "WS Audiology": 25361.44,
          "Sonova/Phonak": 154994.40,
          "Starkey": 154112.40
        },
        sales_percentage: {
          "GN Resound": 9.06,
          "Oticon": 12.58,
          "WS Audiology": 5.94,
          "Sonova/Phonak": 36.31,
          "Starkey": 36.11
        },
        units_sold: {
          "GN Resound": 337,
          "Oticon": 579,
          "WS Audiology": 274,
          "Sonova/Phonak": 1540,
          "Starkey": 1649
        },
        average_cost: {
          "GN Resound": 114.71,
          "Oticon": 92.72,
          "WS Audiology": 92.56,
          "Sonova/Phonak": 100.65,
          "Starkey": 93.46
        }
      }
    },
    totals: {
      sales: {
        "GN Resound": 84453.20,
        "Oticon": 113293.44,
        "WS Audiology": 47298.16,
        "Sonova/Phonak": 330153.12,
        "Starkey": 307206.64,
        "total": 882404.56
      },
      units_sold: {
        "GN Resound": 738,
        "Oticon": 1222,
        "WS Audiology": 510,
        "Sonova/Phonak": 3276,
        "Starkey": 3292,
        "total": 9038
      },
      average_cost: {
        "GN Resound": 114.44,
        "Oticon": 92.71,
        "WS Audiology": 92.74,
        "Sonova/Phonak": 100.78,
        "Starkey": 93.32,
        "overall": 97.63
      }
    }
  }]
  

  // const metrics = aggregateCompanyData(data);
  // exportCompanyData(data)
    const container = document.getElementById('strategic-initiatives-content');
    container.innerHTML = ""
    while (container.firstChild) {
      container.removeChild(container.firstChild);
  }
    container.className = 'p-6';

    const overallMetrics = calculateOverallMetrics(data);
    const overallSummary = document.createElement('div');
    overallSummary.className = 'mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow';
    overallSummary.innerHTML = `
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Overall Performance Summary</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Market Leaders</h3>
          <div class="space-y-2 text-gray-900 dark:text-white">
            ${overallMetrics.topPerformers.map((company, i) => 
              `<p>${i + 1}. ${company.name} (${company.share.toFixed(1)}%)</p>`
            ).join('')}
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Revenue</h3>
          <p class="text-2xl text-gray-900 dark:text-white">$${overallMetrics.totalRevenue.toLocaleString()}</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Units</h3>
          <p class="text-2xl text-gray-900 dark:text-white">${overallMetrics.totalUnits.toLocaleString()}</p>
        </div>
      </div>
    `;
    container.appendChild(overallSummary);

  data.forEach((group, index) => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow';
    
    // Title
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold mb-6 text-gray-900 dark:text-white';
    title.textContent = group.title;
    groupDiv.appendChild(title);

    // Month selector
    const months = Object.keys(group.monthly_data || {});
    const monthSelector = document.createElement('div');
    monthSelector.className = 'flex gap-4 mb-6';
    months.forEach(month => {
      const btn = document.createElement('button');
      btn.className = 'px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white';
      btn.textContent = month;
      btn.onclick = () => updateCharts(group, month, index);
      monthSelector.appendChild(btn);
    });
    groupDiv.appendChild(monthSelector);

    // Calculate group totals
    const groupMetrics = calculateGroupMetrics(group);

    // Totals summary
    // Totals summary
    const totalsDiv = document.createElement('div');
    totalsDiv.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8';
    totalsDiv.innerHTML = `
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Sales</h3>
        <p class="text-2xl text-gray-900 dark:text-white">$${groupMetrics.totalSales.toLocaleString()}</p>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Units</h3>
        <p class="text-2xl text-gray-900 dark:text-white">${groupMetrics.totalUnits.toLocaleString()}</p>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Average Cost</h3>
        <p class="text-2xl text-gray-900 dark:text-white">$${groupMetrics.averageCost.toFixed(2)}</p>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Top Performer</h3>
        <p class="text-2xl text-gray-900 dark:text-white">${groupMetrics.topPerformer}</p>
      </div>
    `;
    groupDiv.appendChild(totalsDiv);

    // Charts container

    const chartsContainer = document.createElement('div');
    chartsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8';
    
    const chartConfigs = [
      {
        type: 'doughnut',
        metric: 'sales',
        title: 'Sales Distribution'
      },
      {
        type: 'bar',
        metric: 'units_sold',
        title: 'Units Sold Comparison',
        stacked: true
      },
      {
        type: 'bar',
        metric: 'sales_percentage',
        title: 'Market Share Analysis',
        stacked: true
      },
      {
        type: 'line',
        metric: 'average_cost',
        title: 'Average Cost Trends'
      }
    ];

    chartConfigs.forEach(config => {
      const chartWrapper = document.createElement('div');
      chartWrapper.className = 'bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow';
      
      const canvas = document.createElement('canvas');
      canvas.id = `chart-${index}-${config.metric}`;
      chartWrapper.appendChild(canvas);
      chartsContainer.appendChild(chartWrapper);

      createChart(canvas, group, config);
    });
    
    groupDiv.appendChild(chartsContainer);

    // Table
    const tableDiv = document.createElement('div');
    tableDiv.className = 'overflow-x-auto';
    const table = document.createElement('table');
    table.className = 'min-w-full divide-y divide-gray-200 dark:divide-gray-600';
    
    const recentMonth = months[months.length - 1];
    const previousMonth = months[months.length - 2];
    
    // Table header
    const thead = document.createElement('thead');
    thead.className = 'bg-gray-50 dark:bg-gray-700';
    thead.innerHTML = `
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sales</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Change</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Units</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Change</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Avg Cost</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Change</th>
      </tr>
    `;
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement('tbody');
    tbody.className = 'bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600';
    
    const recentData = group.monthly_data[recentMonth];
    const previousData = group.monthly_data[previousMonth];
    
    if (recentData && previousData) {
      Object.keys(recentData.sales || {}).forEach((company, i) => {
        const getChange = (current, previous) => {
          const change = ((current - previous) / previous) * 100;
          const color = change >= 0 ? 'text-green-500' : 'text-red-500';
          return `<span class="${color}">${change.toFixed(1)}%</span>`;
        };

        const tr = document.createElement('tr');
        tr.className = i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800';
        
        tr.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${company}</td>
          <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">$${recentData.sales[company].toLocaleString()}</td>
          <td class="px-6 py-4 whitespace-nowrap">${getChange(recentData.sales[company], previousData.sales[company])}</td>
          <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${recentData.units_sold[company].toLocaleString()}</td>
          <td class="px-6 py-4 whitespace-nowrap">${getChange(recentData.units_sold[company], previousData.units_sold[company])}</td>
          <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">$${recentData.average_cost[company]?.toFixed(2) || 'N/A'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${recentData.average_cost[company] ? 
            getChange(recentData.average_cost[company], previousData.average_cost[company]) : 'N/A'}</td>
        `;
        tbody.appendChild(tr);
      });
    }
    
    table.appendChild(tbody);
    tableDiv.appendChild(table);
    groupDiv.appendChild(tableDiv);

    container.appendChild(groupDiv);
  });
}

function getChangeIndicator(current, previous) {
    const change = ((current - previous) / previous) * 100;
    const color = change >= 0 ? 'text-green-500' : 'text-red-500';
    return `
      <div class="${color} flex items-center text-sm font-medium">
        ${change >= 0 ? '↑' : '↓'} ${Math.abs(change).toFixed(1)}%
      </div>
    `;
  }
  
  function calculateOverallMetrics(data, monthOffset = -1) {
    let companyTotals = {};
    let totalRevenue = 0;
    let totalUnits = 0;
  
    data.forEach(group => {
      if (group.totals && group.totals.sales) {
        Object.entries(group.totals.sales).forEach(([company, sales]) => {
          if (company !== 'total') {
            companyTotals[company] = (companyTotals[company] || 0) + sales;
            totalRevenue += sales;
          }
        });
      }
      if (group.totals && group.totals.units_sold) {
        Object.entries(group.totals.units_sold).forEach(([company, units]) => {
          if (company !== 'total') {
            totalUnits += units;
          }
        });
      }
    });
  
    // Calculate market share and sort companies
    const topPerformers = Object.entries(companyTotals)
      .map(([name, sales]) => ({
        name,
        sales,
        share: (sales / totalRevenue) * 100
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 3);
  
    return {
      topPerformers,
      totalRevenue,
      totalUnits
    };
  }
  
  function calculateGroupMetrics(group) {
    if (!group.monthly_data) return {
      totalSales: 0,
      totalUnits: 0,
      averageCost: 0,
      topPerformer: 'N/A'
    };
  
    let totalSales = 0;
    let totalUnits = 0;
    let companyTotals = {};
  
    Object.values(group.monthly_data).forEach(monthData => {
      Object.entries(monthData.sales || {}).forEach(([company, sales]) => {
        companyTotals[company] = (companyTotals[company] || 0) + sales;
        totalSales += sales;
      });
      Object.values(monthData.units_sold || {}).forEach(units => {
        totalUnits += units;
      });
    });
  
    const topPerformer = Object.entries(companyTotals)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  
    const averageCost = totalSales / totalUnits;
  
    return {
      totalSales,
      totalUnits,
      averageCost: isNaN(averageCost) ? 0 : averageCost,
      topPerformer
    };
  }

// function calculateGroupMetrics(group) {
//     if (!group.monthly_data) return {
//       totalSales: 0,
//       totalUnits: 0,
//       averageCost: 0,
//       topPerformer: 'N/A'
//     };
  
//     let totalSales = 0;
//     let totalUnits = 0;
//     let companyTotals = {};
  
//     Object.values(group.monthly_data).forEach(monthData => {
//       Object.entries(monthData.sales || {}).forEach(([company, sales]) => {
//         companyTotals[company] = (companyTotals[company] || 0) + sales;
//         totalSales += sales;
//       });
//       Object.values(monthData.units_sold || {}).forEach(units => {
//         totalUnits += units;
//       });
//     });
  
//     const topPerformer = Object.entries(companyTotals)
//       .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  
//     const averageCost = totalSales / totalUnits;
  
//     return {
//       totalSales,
//       totalUnits,
//       averageCost: isNaN(averageCost) ? 0 : averageCost,
//       topPerformer
//     };
//   }


function createChart(canvas, group, config) {

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }
    
  const months = Object.keys(group.monthly_data || {});
  const recentMonth = months[months.length - 1];
  const data = group.monthly_data[recentMonth]?.[config.metric] || {};
  
  const chartColors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#6366f1',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'
  ];

  const companies = Object.keys(data);
  const values = Object.values(data);

  const chartConfig = {
    type: config.type,
    data: {
      labels: companies,
      datasets: [{
        label: config.title,
        data: values,
        backgroundColor: chartColors.slice(0, companies.length),
        borderColor: config.type === 'line' ? chartColors[0] : undefined,
        borderWidth: 1,
        fill: config.type === 'line' ? false : true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: 'rgb(156, 163, 175)'
          }
        },
        title: {
          display: true,
          text: config.title,
          color: 'rgb(156, 163, 175)',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      },
      scales: config.type !== 'doughnut' ? {
        y: {
          stacked: config.stacked || false,
          beginAtZero: true,
          grid: {
            color: 'rgba(156, 163, 175, 0.1)'
          },
          ticks: {
            color: 'rgb(156, 163, 175)'
          }
        },
        x: {
          stacked: config.stacked || false,
          grid: {
            color: 'rgba(156, 163, 175, 0.1)'
          },
          ticks: {
            color: 'rgb(156, 163, 175)'
          }
        }
      } : undefined
    }
  };

  new Chart(canvas, chartConfig);
}

function updateCharts(group, selectedMonth, groupIndex) {
  const chartTypes = ['sales', 'units_sold', 'sales_percentage', 'average_cost'];
  
  chartTypes.forEach(metric => {
    const canvas = document.getElementById(`chart-${groupIndex}-${metric}`);
    const chart = Chart.getChart(canvas);
    if (chart) {
      const data = group.monthly_data[selectedMonth][metric];
      chart.data.datasets[0].data = Object.values(data);
      chart.update();
    }
  });
}
function aggregateCompanyData(data) {
  const companyMetrics = {};
  let totalOverallSales = 0;
  let totalOverallUnits = 0;

  // First pass to get total sales for market share calculation
  data.forEach(group => {
    if (group.totals && group.totals.sales) {
      Object.entries(group.totals.sales).forEach(([company, sales]) => {
        if (company !== 'total') {
          totalOverallSales += sales;
        }
      });
    }
  });

  // Second pass to aggregate all metrics
  data.forEach(group => {
    if (group.totals) {
      // Process sales
      if (group.totals.sales) {
        Object.entries(group.totals.sales).forEach(([company, sales]) => {
          if (company !== 'total') {
            if (!companyMetrics[company]) {
              companyMetrics[company] = {
                totalSales: 0,
                totalUnits: 0,
                totalMarketShare: 0,
                averageCost: 0,
                productCategories: new Set(),
                monthlyTrends: {}
              };
            }
            companyMetrics[company].totalSales += sales;
            companyMetrics[company].totalMarketShare = 
              (companyMetrics[company].totalSales / totalOverallSales) * 100;
          }
        });
      }

      // Process units
      if (group.totals.units_sold) {
        Object.entries(group.totals.units_sold).forEach(([company, units]) => {
          if (company !== 'total') {
            companyMetrics[company].totalUnits += units;
          }
        });
      }

      // Track product categories
      Object.entries(companyMetrics).forEach(([company]) => {
        companyMetrics[company].productCategories.add(group.title);
      });
    }

    // Process monthly trends
    if (group.monthly_data) {
      Object.entries(group.monthly_data).forEach(([month, monthData]) => {
        Object.entries(monthData.sales || {}).forEach(([company, sales]) => {
          if (!companyMetrics[company].monthlyTrends[month]) {
            companyMetrics[company].monthlyTrends[month] = {
              sales: 0,
              units: 0,
              marketShare: 0
            };
          }
          companyMetrics[company].monthlyTrends[month].sales += sales;
          companyMetrics[company].monthlyTrends[month].units += 
            monthData.units_sold?.[company] || 0;
          companyMetrics[company].monthlyTrends[month].marketShare = 
            monthData.sales_percentage?.[company] || 0;
        });
      });
    }
  });

  // Calculate average costs
  Object.entries(companyMetrics).forEach(([company, metrics]) => {
    metrics.averageCost = metrics.totalSales / metrics.totalUnits;
    metrics.productCategories = Array.from(metrics.productCategories);
  });

  return companyMetrics;
}

function convertToCSV(metrics) {
  const headers = ['Company', 'Total Sales', 'Total Units', 'Market Share', 'Average Cost', 'Product Categories'];
  const rows = Object.entries(metrics).map(([company, data]) => [
    company,
    data.totalSales.toFixed(2),
    data.totalUnits,
    data.totalMarketShare.toFixed(2) + '%',
    data.averageCost.toFixed(2),
    data.productCategories.join('; ')
  ]);
  
  return [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
}

function exportCompanyData(data, format = 'json') {
  const metrics = aggregateCompanyData(data);
  let exportData = '';
  let filename = '';
  let mimeType = '';

  if (format === 'json') {
    exportData = JSON.stringify(metrics, null, 2);
    filename = 'company_metrics.json';
    mimeType = 'application/json';
  } else if (format === 'csv') {
    exportData = convertToCSV(metrics);
    filename = 'company_metrics.csv';
    mimeType = 'text/csv';
  }

  const blob = new Blob([exportData], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export { aggregateCompanyData, exportCompanyData };

export { renderStrategicAnalysis };