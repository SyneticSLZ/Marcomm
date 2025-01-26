const wsData = {
    "company": "WS Audiology A/S",
    "fiscal_year": "2023/24",
    "key_financials": {
      "revenue": {
        "total": 2637,
        "organic_growth": 10,
        "by_region": {
          "EMEA": {
            "revenue": 888,
            "growth": 11,
            "share": 34
          },
          "Americas": {
            "revenue": 1323,
            "growth": 11,
            "share": 50
          },
          "APAC": {
            "revenue": 426,
            "growth": 9,
            "share": 16
          }
        }
      },
      "profitability": {
        "gross_profit": 1496,
        "gross_margin": 56.7,
        "EBITDA": {
          "before_special_items": 542,
          "margin": 20.6,
          "reported": 521
        },
        "net_loss": 1197
      },
      "balance_sheet": {
        "total_assets": 5288,
        "equity": 838,
        "goodwill": 3586,
        "intangible_assets": 420,
        "net_working_capital": 319
      },
      "cash_flow": {
        "operating": 395,
        "free_cash_flow": 205,
        "investing": -188,
        "financing": -216
      },
      "debt_structure": {
        "net_interest_bearing_debt": 3308,
        "available_credit_facility": 217,
        "term_loans": {
          "EUR": {
            "amount": 1830,
            "maturity": "February 2029",
            "interest_rate": "Euribor + 4.5%"
          },
          "USD": {
            "amount": 1047,
            "maturity": "February 2029",
            "interest_rate": "Term SOFR + 4.25%"
          }
        }
      }
    },
    "operational_metrics": {
      "employees": {
        "total": 12679,
        "by_function": {
          "RnD": 1150
        },
        "turnover": {
          "total": "18%",
          "voluntary": "10%"
        },
        "engagement_score": 7.9
      },
      "infrastructure": {
        "offices": 45,
        "production_sites": 7,
        "RnD_hubs": {
          "total": 4,
          "locations": ["Denmark", "Germany", "India", "Singapore"]
        }
      },
      "research_development": {
        "total_spend": 183,
        "as_percent_of_sales": 6.9,
        "capitalized": 102,
        "annual_launches": "100+"
      }
    },
    "sustainability_metrics": {
      "emissions": {
        "scope1": 2673,
        "scope2": {
          "market_based": 3067,
          "location_based": 11294
        },
        "scope3": 318261
      },
      "energy": {
        "total_consumption": 46932,
        "renewable_electricity_share": 83,
        "target_2025": "100%"
      },
      "waste_management": {
        "total_waste": 1233917,
        "recycling_rate": 80,
        "hazardous_waste": 97654
      },
      "product_sustainability": {
        "FSC_paper_packaging": 81
      }
    },
    "market_data": {
      "addressable_market": {
        "total_hearing_loss": "1.6 billion people",
        "current_penetration": "less than 20%",
        "annual_market_size": "12 million people",
        "market_growth_rate": "5-6%"
      },
      "competitive_position": {
        "people_equipped_since_inception": "18 million",
        "target_2028": "20 million more",
        "current_year_impact": {
          "people_equipped": 4.1,
          "awareness_tests": 2.3,
          "affordable_solutions": 1.4
        }
      }
    },
    "governance": {
      "ownership": {
        "CN8_AS": 51,
        "EQT": 49
      },
      "key_management": {
        "board_chair": "Lars Rasmussen",
        "executive_board": {
          "CEO": "Jan Makela",
          "CFO": "Marianne Wiinholt",
          "President_Americas": "Carsten Buhl"
        }
      },
      "diversity": {
        "women_in_management": 39,
        "board_diversity": {
          "women_representation": 13,
          "target_2028": 30
        }
      }
    }
  };
  
  export default wsData;