const sonovaData = {
    current_period: {
      period: "First half 2024/25",
      key_financials: {
        revenue: {
          total: 1833.2,
          growth: {
            local_currency: 5.9,
            swiss_francs: 4.6
          }
        },
        ebita: {
          adjusted: 325.2,
          margin_adjusted: 17.7,
          reported: 307.9
        },
        segments: {
          hearing_instruments: {
            revenue: 1685.7,
            organic_growth: 5.4,
            adjusted_ebita: 309.7,
            margin: 18.4,
            subsegments: {
              hearing_instruments_business: {
                revenue: 868.2,
                growth: 7.0
              },
              audiological_care: {
                revenue: 700.8,
                growth: 4.6
              },
              consumer_hearing: {
                revenue: 116.7,
                growth: -1.7
              }
            }
          },
          cochlear_implants: {
            revenue: 147.6,
            organic_growth: 12.5,
            adjusted_ebita: 15.8,
            margin: 10.7
          }
        }
      },
      balance_sheet: {
        total_assets: 5456.0,
        equity: 2309.7,
        equity_ratio: 42.3,
        net_debt: 1573.2
      }
    },
    prior_year: {
      period: "Full Year 2023/24",
      key_financials: {
        sales: 3626.9,
        gross_profit: 2610.4,
        ebita: 727.0,
        ebita_margin: 20.0,
        operating_free_cash_flow: 539.2,
        roce: 17.7,
        earnings_per_share: {
          basic: 10.08
        }
      },
      sales_by_region: {
        emea: {
          revenue: 1859.0,
          share: 51
        },
        usa: {
          revenue: 1074.0,
          share: 30
        },
        americas_excl_usa: {
          revenue: 264.4,
          share: 7
        },
        asia_pacific: {
          revenue: 429.4,
          share: 12
        }
      },
      sales_by_business: {
        hearing_instruments: {
          revenue: 1697.2,
          share: 51
        },
        audiological_care: {
          revenue: 1410.5,
          share: 42
        },
        consumer_hearing: {
          revenue: 239.7,
          share: 7
        }
      },
      costs: {
        research_and_development: 237.5,
        sales_and_marketing: 1290.4,
        general_and_administration: 354.9
      },
      balance_sheet: {
        total_assets: 5791.8,
        total_liabilities: 3300.4,
        equity: 2491.3
      }
    },
    company_structure: {
      significant_subsidiaries: [
        {
          name: "Sonova AG",
          location: "Stäfa, Switzerland",
          ownership: 100
        },
        {
          name: "Advanced Bionics AG",
          location: "Stäfa, Switzerland",
          ownership: 100
        },
        {
          name: "Boots Hearing Care Ltd",
          location: "Conwy, UK",
          ownership: 51
        }
      ],
      additional_info: {
        employees: 18554, // As of latest report
        countries_presence: "over 100",
        headquarters: "Stäfa, Switzerland",
        stock_listing: "SIX Swiss Exchange"
      }
    },
    outlook_2024_25: {
      sales_growth_guidance: "6-9%",
      adjusted_ebita_growth_guidance: "7-11%"
    }
  };
  
  export default sonovaData;