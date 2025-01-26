const DemantData = {
  company: "Demant A/S",
  fiscal_period: "H1 2024",
  key_financials: {
    revenue: {
      total: 11087,
      organic_growth: 3,
      acquisition_growth: 2,
      fx_impact: -1,
      reported_growth: 4,
      by_region: {
        Europe: {
          revenue: 4569,
          growth: 7,
          organic_growth: 2,
          lcyGrowth: 6,
          share: 41.2
        },
        North_America: {
          revenue: 4609,
          growth: 3,
          organic_growth: 3,
          lcyGrowth: 4,
          share: 41.6
        },
        Asia: {
          revenue: 1058,
          growth: -6,
          organic_growth: 2,
          lcyGrowth: 2,
          share: 9.5
        },
        Pacific: {
          revenue: 536,
          growth: 1,
          organic_growth: 6,
          lcyGrowth: 6,
          share: 4.8
        },
        Rest_of_world: {
          revenue: 315,
          growth: 2,
          organic_growth: 2,
          lcyGrowth: 2,
          share: 2.9
        }
      },
      by_segment: {
        hearing_aids: {
          total: 6230,
          organic_growth: 3,
          acquisition_growth: 1,
          fx_impact: -1,
          reported_growth: 2,
          internal_sales: 1208,
          external_sales: 5022,
          q2_revenue: 3123,
          q2_organic_growth: 3,
          unit_growth: -6,
          asp_growth: 11
        },
        hearing_care: {
          total: 4834,
          organic_growth: 3,
          acquisition_growth: 4,
          fx_impact: 0,
          reported_growth: 7,
          q2_revenue: 2516,
          q2_organic_growth: 5
        },
        diagnostics: {
          total: 1231,
          organic_growth: 3,
          acquisition_growth: 0,
          fx_impact: 0,
          reported_growth: 3,
          q2_revenue: 634,
          q2_organic_growth: 0
        }
      }
    },
    profitability: {
      gross_profit: 8510,
      gross_margin: 76.8,
      gross_profit_growth: 6,
      production_costs: -2577,
      rd_costs: {
        total: -733,
        growth: 21,
        percent_of_revenue: 6.6
      },
      distribution_costs: {
        total: -5154,
        growth: 9
      },
      administrative_expenses: {
        total: -586,
        growth: 4
      },
      EBITDA: {
        total: 2897,
        margin: 26.1,
        comparative_margin_h1_2023: 26.1
      },
      EBIT: {
        before_special_items: 2068,
        margin_before_special_items: 18.7,
        reported: 2192,
        margin: 19.8,
        special_items: 124
      },
      net_financial_items: {
        income: 53,
        expenses: -463,
        total: -410
      },
      tax: {
        total: -428,
        effective_rate: 24.0
      },
      profit_after_tax: {
        continuing_operations: 1354,
        discontinued_operations: -154,
        total: 1200
      }
    },
    balance_sheet: {
      total_assets: 32390,
      equity: 9522,
      net_interest_bearing_debt: 13853,
      gearing_multiple: 2.3,
      working_capital: 3546,
      goodwill: 13335,
      lease_assets: 2630,
      inventories: 2674,
      trade_receivables: 3705,
      cash: 1048
    },
    cash_flow: {
      operating: 1491,
      investing: -1097,
      free_cash_flow: 1157,
      financing: -191,
      net_investments: -334,
      acquisitions: -763,
      share_buybacks: -1137,
      capex: {
        total: 375,
        percent_of_revenue: 3.0
      }
    }
  },
  operational_metrics: {
    employees: {
      total: 21501,
      change_from_previous_year: 822,
      turnover: {
        total: "n/a", // Not provided in report
        voluntary: "n/a" // Not provided in report
      }
    },
    infrastructure: {
      offices: "n/a", // Not provided in report
      production_sites: "n/a" // Not provided in report
    },
    rnd: {
      costs: 733,
      growth: 21,
      percent_of_revenue: 6.6,
      capitalized: "n/a" // Not provided in report
    }
  },
  sustainability_metrics: {
    emissions: {
      scope_1_2_market_based: 16219,
      scope_1_2_location_based: 16381
    },
    renewable_electricity_share: 24,
    diversity: {
      board_gender_ratio: {
        women: 25,
        men: 75,
        target_2025: "n/a" // Not provided in report
      },
      all_managers_gender_ratio: {
        women: 49,
        men: 51
      },
      top_level_management_gender_ratio: {
        women: 30,
        men: 70
      },
      top_level_management_teams_on_target: 81
    }
  },
  market_data: {
    share_price: 301.40,
    average_shares_outstanding: 218.97,
    eps: {
      continuing_operations: 6.18,
      total: 5.47
    },
    free_cash_flow_per_share: 5.28
  },
  discontinued_operations: {
    revenue: 602,
    expenses: -719,
    loss_on_sale: -36,
    amortisation_depreciation: -78,
    profit_before_tax: -231,
    tax: 77,
    total_loss: -154
  },
  historical_comparison: {
    revenue: {
      h1_2023: 10694,
      h2_2023: 10907,
      full_year_2023: 21601
    },
    organic_growth: {
      h1_2023: 15,
      full_year_2023: 14
    },
    ebit_margin: {
      h1_2023: 20.2,
      full_year_2023: 20.9
    }
  }
};

// console.log(JSON.stringify(demantData, null, 2));

export default DemantData