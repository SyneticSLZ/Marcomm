const gnData = {
    company_info: {
      name: "GN Store Nord A/S",
      headquarters: "Lautrupbjerg 7, 2750 Ballerup, Denmark",
      registration_number: "24257843",
      contact: {
        phone: "+45 45 75 00 00",
        email: "info@gn.com",
        website: "gn.com"
      }
    },
    
    period: {
      quarter: "Q3",
      year: 2024,
      report_date: "November 7, 2024"
    },
  
    financial_highlights: {
      revenue: {
        total: 4164,
        yoy_growth: -6,
        organic_growth: -4,
        fx_impact: -1,
        ma_impact: -1,
        by_division: {
          hearing: {
            revenue: 1725,
            organic_growth: 10,
            yoy_growth: 4
          },
          enterprise: {
            revenue: 1680,
            organic_growth: -7,
            yoy_growth: -9
          },
          gaming_consumer: {
            revenue: 759,
            organic_growth: -20,
            yoy_growth: -20
          }
        },
        by_geography: {
          europe: {
            revenue: 1518,
            yoy_change: -224 // Calculated from 1742 in Q3 2023
          },
          north_america: {
            revenue: 1730,
            yoy_change: 58 // From 1672 in Q3 2023
          },
          rest_of_world: {
            revenue: 916,
            yoy_change: -113 // From 1029 in Q3 2023
          }
        }
      },
  
      profitability: {
        gross_profit: {
          value: 2283,
          margin: 54.8,
          yoy_margin_change: 4.7
        },
        ebita: {
          value: 553,
          margin: 13.3,
          yoy_growth: 29,
          yoy_margin_change: 3.6
        },
        divisional_profits: {
          hearing: {
            value: 600,
            margin: 34.8,
            yoy_margin_change: 5.9
          },
          enterprise: {
            value: 568,
            margin: 33.8,
            yoy_margin_change: -0.7
          },
          gaming_consumer: {
            value: 30,
            margin: 4.0,
            yoy_margin_change: 1.8
          }
        }
      },
  
      cash_flow: {
        operating_activities: 1006,
        investing_activities: -114,
        free_cash_flow: {
          excl_ma: 786,
          incl_ma: 892
        },
        cash_conversion: 142 // % of EBITA
      },
  
      balance_sheet: {
        total_assets: 29584,
        equity: 10187,
        equity_ratio: 34.4,
        net_interest_bearing_debt: 9698,
        leverage_ratio: {
          adjusted: 3.5,
          reported: 4.3
        },
        cash_and_equivalents: 1100
      }
    },
  
    operational_metrics: {
      employees: {
        total: 7281,
        yoy_change: 63 // From 7218 in Q3 2023
      },
      development_costs: {
        total: 343,
        capitalized: 128,
        rd_intensity: 8.2 // % of revenue
      }
    },
  
    capital_structure: {
      shares: {
        outstanding: 145613000,
        treasury: 5300179,
        percentage_treasury: 3.5
      },
      market_metrics: {
        share_price: 149.8,
        market_cap: 21806,
        foreign_ownership: "~70%",
        major_shareholders: [{
          name: "William Demant Invest A/S",
          ownership: ">10%"
        }]
      }
    },
  
    guidance_2024: {
      organic_growth: {
        range: "1% to 2%",
        previous: "2% to 6%" // Added from report context
      },
      ebita_margin: {
        range: "12% to 13%",
        confirmed: true
      },
      free_cash_flow_excl_ma: {
        target: ">1,100",
        upgraded: true // Noted from report
      }
    },
  
    ytd_performance: {
      revenue: 12966,
      organic_growth: 2,
      ebita: 1465,
      ebita_margin: 11.3,
      net_profit: 667
    }
  };
  

  // console.log(JSON.stringify(gnQ3_2024_data, null, 2));

  export default gnData;