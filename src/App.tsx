import { useState, useEffect, useMemo } from 'react'
interface KpiData {
  kpiID: number
  KPIName: string
  dcode: number
  DistrictName: string
  Dept_name: string
  segment: string
  data_to_be_process: string
  valuetype: number
  KPI_Type: string
  Numerator: number
  Denominator: number
  Per: number
  weightage: number
  scaleValue: number
  wisi: number
  AsOnDate: string
}

interface NewsItem {
  id: number
  category: string
  article_category: string
  summary_headline: string
  district: string
  department: string
  summary_body: string
  news_type: string | null
}

interface AlertItem {
  id: string;
  conveyed_date: string;
  days_taken: number;
  current_state_value: number;
  department_name: string;
  name_of_alert: string;
  alert_statement: string;
  alert_statement_gujarati: string;
  created_at: string;
};


interface RTPMSDataInterface {
  id: number;
  name?: string;
  wisi: number;
  sr_no: number;
  kpi_id: number;
  source: string;
  officer: string;
  district?: string;
  DistrictName?: string;
  kpi_name?: string;
  department?: string;
  template_filled?: string;
}


interface RtPmsInterface {
  id: number;
  source_id: string;
  data: RTPMSDataInterface;
  created_at: string;
}

interface BudgetStateInterface {
  total_budget: number;
  total_grant: number;
  grant_expenditure: number;
  grant_expenditure_percentage: number;
}

interface BudgetBottomThreeInterface {
  prabhag_name: string;
  department_eng: string;
  total_budget: number;
  total_grant: number;
  total_expenditure: number;
  budget_percentage: number;
  grant_percentage: number;
}

interface BudgetResponseInterface {
  state: BudgetStateInterface;
  bottom_three: BudgetBottomThreeInterface[];
}


interface PragatiInterface {
  id: string;
  name_of_project: string;
  timely_progress: number;
  physical_progress: number;
  financial_progress: number;
  statement: string;
  statement_gujarati: string;
  created_at: string;
};





const App = () => {

  const [state, setState] = useState<KpiData[]>(() => {
    const injected = (window as { __injectedKpiData?: unknown }).__injectedKpiData;
    return Array.isArray(injected) ? (injected as KpiData[]) : [];
  });

  const [newsresult, setNewsResult] = useState<NewsItem[]>(() => {
    const injected = (window as { __injectedNewsData?: unknown }).__injectedNewsData;
    return Array.isArray(injected) ? (injected as NewsItem[]) : [];
  });

  const [alertresult, setAlertResult] = useState<AlertItem[]>(() => {
    const injected = (window as { __injectedAlertData?: unknown }).__injectedAlertData;
    return Array.isArray(injected) ? (injected as AlertItem[]) : [];
  });

  const [rtpmsresult, setrtpmsResult] = useState<RtPmsInterface[]>(() => {
    const injected = (window as { __injectedRtpmsData?: unknown }).__injectedRtpmsData;
    return Array.isArray(injected) ? (injected as RtPmsInterface[]) : [];
  });

  const [budgetresult, setbudgetResult] = useState<BudgetResponseInterface | null>(() => {
    const injected = (window as { __injectedBudgetData?: unknown }).__injectedBudgetData;
    if (injected && typeof injected === "object" && !Array.isArray(injected)) {
      return injected as BudgetResponseInterface;
    }
    return null;
  });

  const [pragatiresult, setPragatiResult] = useState<PragatiInterface[]>(() => {
    const injected = (window as { __injectedBudgetData?: unknown }).__injectedBudgetData;
    if (injected && typeof injected === "object" && !Array.isArray(injected)) {
      const obj = injected as { bottom_three?: PragatiInterface[] };
      return Array.isArray(obj.bottom_three) ? obj.bottom_three : [];
    }
    return Array.isArray(injected) ? (injected as PragatiInterface[]) : [];
  });



  const today = useMemo(
    () => new Intl.DateTimeFormat('sv-SE').format(new Date()),
    []
  );

  const customtoday = "2026-07-10"


  const [edits, setEdits] = useState<Record<string, string>>(() => {
    const injected = (window as { __injectedEdits?: unknown }).__injectedEdits;
    if (injected && typeof injected === 'object') {
      const out: Record<string, string> = {};
      for (const [k, v] of Object.entries(injected as Record<string, unknown>)) {
        if (typeof v === 'string') out[k] = v;
      }
      return out;
    }
    return {};
  });

  useEffect(() => {
    if (Object.keys(edits).length > 0) return;
    fetch(`/api/edits?date=${today}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.edits && typeof data.edits === 'object') {
          setEdits(data.edits as Record<string, string>);
        }
      })
      .catch(() => { });
  }, [today, edits]);

  const handleSaveEdits = async () => {
    try {
      await fetch('/api/edits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, edits }),
      });
    } catch (err) {
      console.error('Save edits error:', err);
    }
  };

  const handleResetEdits = async () => {
    setEdits({});
    try {
      await fetch('/api/edits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, edits: {} }),
      });
    } catch (err) {
      console.error('Reset edits error:', err);
    }
  };

  // Generate a unique edit key for an element.
  // Priority: explicit data-edit-key > data-pencil-name path + sibling index.
  const getEditKey = (el: HTMLElement): string | null => {
    const explicit = el.getAttribute('data-edit-key')
    if (explicit) return explicit

    // Walk up to find the nearest data-pencil-name ancestor (the element itself counts)
    const name = el.getAttribute('data-pencil-name')
    if (!name) return null

    // Build a path: parent data-pencil-name / own name[#index]
    const parts: string[] = [name]
    let cur: HTMLElement | null = el.parentElement
    while (cur && cur.id !== 'newsletter-content') {
      const pName = cur.getAttribute('data-pencil-name')
      if (pName) parts.unshift(pName)
      cur = cur.parentElement
    }
    // Disambiguate same-name siblings
    const parent = el.parentElement
    if (parent) {
      const sameName = Array.from(parent.children).filter(
        (c) => (c as HTMLElement).getAttribute('data-pencil-name') === name
      )
      if (sameName.length > 1) {
        const idx = sameName.indexOf(el)
        parts[parts.length - 1] = `${name}#${idx}`
      }
    }
    return parts.join(' > ')
  };

  // Check if an element is a leaf text element (editable as a whole)
  const isLeafTextElement = (el: HTMLElement): boolean => {
    // Has no children with data-pencil-name or data-edit-key
    for (const child of Array.from(el.children)) {
      if (
        (child as HTMLElement).hasAttribute('data-pencil-name') ||
        (child as HTMLElement).hasAttribute('data-edit-key')
      ) {
        return false
      }
    }
    // Has some direct text content
    return (el.textContent || '').trim().length > 0
  };

  // Container-level blur handler: find the edited element and save
  const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (!target || target === e.currentTarget) return
    // Find the nearest leaf element with a data-pencil-name or data-edit-key
    let el: HTMLElement | null = target
    while (el && el !== e.currentTarget) {
      if (el.hasAttribute('data-edit-key') || el.hasAttribute('data-pencil-name')) {
        if (!isLeafTextElement(el)) break
        const key = getEditKey(el)
        if (!key) break
        const newText = (el.textContent || '').trim()
        setEdits((prev) => {
          if (newText === '') {
            if (!(key in prev)) return prev
            const next = { ...prev }
            delete next[key]
            return next
          }
          if (prev[key] === newText) return prev
          return { ...prev, [key]: newText }
        })
        break
      }
      el = el.parentElement
    }
  };

  // Sync edits state -> DOM textContent
  useEffect(() => {
    const root = document.getElementById('newsletter-content')
    if (!root) return
    const elements = root.querySelectorAll<HTMLElement>('[data-pencil-name], [data-edit-key]')
    elements.forEach((el) => {
      if (document.activeElement === el) return // don't overwrite while user is editing
      if (!isLeafTextElement(el)) return
      const key = getEditKey(el)
      if (!key) return
      const edited = edits[key]
      if (edited !== undefined && (el.textContent || '').trim() !== edited) {
        el.textContent = edited
      }
    })
  }, [edits]);

  const positive_news = newsresult.filter((value) => value.news_type == 'positive');
  const focus_department = newsresult.filter((value) => value.news_type == 'focused department')
  focus_department.map((result) => {
    console.log("brijesh result = ", result);
  })
  useEffect(() => {
    const w = window as {
      __injectedKpiData?: unknown;
      __injectedNewsData?: unknown;
      __injectedAlertData?: unknown;
      __injectedRtpmsData?: unknown;
      __injectedBudgetData?: unknown;
      __kpiLoaded?: boolean;
      __newsLoaded?: boolean;
      __alertLoaded?: boolean;
      __rtpmsLoaded?: boolean;
      __budgetLoaded?: boolean;
    };

    // KPI
    if (Array.isArray(w.__injectedKpiData)) {
      w.__kpiLoaded = true;
    } else {
      fetch("http://10.83.29.76:9017/kpi?date=2026-07-08")
        .then((res) => res.json())
        .then((data) => {
          console.log("KPI data:", data);

          setState(
            Array.isArray(data)
              ? data
              : Array.isArray(data?.data)
                ? data.data
                : []
          );

          w.__kpiLoaded = true;
        })
        .catch((err) => {
          console.error("KPI fetch error:", err);
          w.__kpiLoaded = true;
        });
    }

    // News
    if (Array.isArray(w.__injectedNewsData)) {
      w.__newsLoaded = true;
    } else {
      fetch(
        `https://swar-api.gujarat.gov.in/newsletter-api/news?date=${today}&limit=50&offset=0`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("News data:", data);

          const news = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : [];

          setNewsResult(news);
          w.__newsLoaded = true;
        })
        .catch((err) => {
          console.error("News fetch error:", err);
          w.__newsLoaded = true;
        });
    }

    // Alerts
    if (Array.isArray(w.__injectedAlertData)) {
      w.__alertLoaded = true;
    } else {
      fetch(
        `https://swar-api.gujarat.gov.in/newsletter-api/alerts?date=${customtoday}&limit=50&offset=0`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Alert data:", data);

          const alerts = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : [];

          setAlertResult(alerts);
          w.__alertLoaded = true;

          console.log("Alerts:", alerts);
        })
        .catch((err) => {
          console.error("Alert fetch error:", err);
          w.__alertLoaded = true;
        });
    };


    // rtpms
    if (Array.isArray(w.__injectedRtpmsData)) {
      w.__rtpmsLoaded = true;
    } else {
      fetch(
        `https://swar-api.gujarat.gov.in/newsletter-api/rtpms?date=${today}&limit=50&offset=0`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("rtpms data:", data);

          const rtpms = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : [];

          setrtpmsResult(rtpms);
          w.__rtpmsLoaded = true;
        })
        .catch((err) => {
          console.error("rtpms fetch error:", err);
          w.__rtpmsLoaded = true;
        });
    }



    // rtpms
    // if (Array.isArray(w.__injectedRtpmsData)) {
    //   w.__rtpmsLoaded = true;
    // } else {
    //   fetch(
    //     `https://swar-api.gujarat.gov.in/newsletter-api/rtpms?date=${today}&limit=50&offset=0`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log("rtpms data:", data);

    //       const rtpms = Array.isArray(data)
    //         ? data
    //         : Array.isArray(data?.data)
    //           ? data.data
    //           : [];

    //       setrtpmsResult(rtpms);
    //       w.__rtpmsLoaded = true;
    //     })
    //     .catch((err) => {
    //       console.error("rtpms fetch error:", err);
    //       w.__rtpmsLoaded = true;
    //     });
    // }

    // budget
    if (w.__injectedBudgetData && !Array.isArray(w.__injectedBudgetData)) {
      w.__budgetLoaded = true;
    } else {
      fetch(
        `https://swar-api.gujarat.gov.in/newsletter-api/budget-mock?date=${today}&limit=50&offset=0`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("budget data:", data);

          const budget = data && typeof data === "object" && !Array.isArray(data)
            ? data
            : null;

          setbudgetResult(budget as BudgetResponseInterface | null);
          w.__budgetLoaded = true;
        })
        .catch((err) => {
          console.error("budget fetch error:", err);
          w.__budgetLoaded = true;
        });
    }



    // pragati
    if (Array.isArray(w.__injectedBudgetData)) {
      w.__budgetLoaded = true;
    } else {
      fetch(
        `https://swar-api.gujarat.gov.in/newsletter-api/pragati?date=${today}&limit=50&offset=0`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("pragati data:", data);

          const pragati = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : [];

          setPragatiResult(pragati);
          w.__budgetLoaded = true;
        })
        .catch((err) => {
          console.error("budget fetch error:", err);
          w.__budgetLoaded = true;
        });
    }



    // mock project
    if (Array.isArray(w.__injectedBudgetData)) {
      w.__budgetLoaded = true;
    } else {
      fetch(
        `https://swar-api.gujarat.gov.in/newsletter-api/budget-mock?date=${customtoday}&limit=50&offset=0`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("mock project:", data);

          const pragati = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : [];

          setPragatiResult(pragati as PragatiInterface[]);
          w.__budgetLoaded = true;
        })
        .catch((err) => {
          console.error("budget fetch error:", err);
          w.__budgetLoaded = true;
        });
    }
  }, []);

  const groupedRtpms = useMemo(() => {
    const map = new Map<string, { district: string; template_filled: string[] }>();
    for (const item of rtpmsresult) {
      const d = item.data?.DistrictName || item.data?.department || `ક્રમ ${item.data?.sr_no ?? ""}`;
      if (!item.data?.template_filled) continue;
      const existing = map.get(d);
      if (existing) {
        existing.template_filled.push(item.data.template_filled);
      } else {
        map.set(d, {
          district: d,
          template_filled: [item.data.template_filled],
        });
      }
    }
    return Array.from(map.values()).slice(0, 3);
  }, [rtpmsresult]);

  console.log("groupRtpms result", groupedRtpms);

  const groupedAlerts = useMemo(() => {
    const map = new Map<string, { department_name: string; alerts: string[] }>();
    for (const item of alertresult) {
      const dept = item.department_name;
      if (!dept) continue;
      const existing = map.get(dept);
      if (existing) {
        if (item.alert_statement_gujarati) {
          existing.alerts.push(item.alert_statement_gujarati);
        }
      } else {
        map.set(dept, {
          department_name: dept,
          alerts: item.alert_statement_gujarati ? [item.alert_statement_gujarati] : [],
        });
      }
    }
    return Array.from(map.values()).slice(0, 4);
  }, [alertresult]);

  const groupedFocusDept = useMemo(() => {
    const map = new Map<string, { department: string; items: { id: number; headline: string; body: string; district: string }[] }>();
    for (const item of focus_department) {
      const dept = item.department || "અન્ય";
      const existing = map.get(dept);
      const entry = {
        id: item.id,
        headline: item.summary_headline || "",
        body: item.summary_body || "",
        district: item.district || "",
      };
      if (existing) {
        existing.items.push(entry);
      } else {
        map.set(dept, { department: dept, items: [entry] });
      }
    }
    return Array.from(map.values()).slice(0, 3);
  }, [focus_department]);

  const primaryBudget = useMemo(() => {
    if (!budgetresult) return undefined;
    return {
      ...budgetresult.state,
      bottom_three: budgetresult.bottom_three,
    };
  }, [budgetresult]);
  const budgetPercent = primaryBudget?.grant_expenditure_percentage;
  const budgetTotalBud = primaryBudget?.total_budget;
  const budgetTotalGrant = primaryBudget?.total_grant;
  const budgetTotalExp = primaryBudget?.grant_expenditure;
  const kpiPercentText = typeof budgetPercent === "number" ? `${budgetPercent.toFixed(2)}` : "94.2%";
  const m1Text = typeof budgetTotalBud === "number"
    ? `${budgetTotalBud.toLocaleString("en-IN")} (Cr)`
    : "N/A (Cr)";
  const m2Text = typeof budgetTotalGrant === "number"
    ? `${budgetTotalGrant.toLocaleString("en-IN")} (Cr)`
    : "N/A (Cr)";
  const m3Text = typeof budgetTotalExp === "number"
    ? `${budgetTotalExp.toLocaleString("en-IN")} (Cr)`
    : "N/A (Cr)";

  return (
    <>
      <button
        onClick={async () => {
          const btn = document.getElementById('export-pdf-btn') as HTMLButtonElement | null
          if (btn) { btn.disabled = true; btn.textContent = 'PDF બનાવી રહ્યા છીએ…' }
          try {
            await handleSaveEdits()
            // Serialize the current DOM which already contains the user's edits
            const root = document.getElementById('newsletter-content')
            const contentHTML = root ? root.innerHTML : ''
            const res = await fetch('/api/pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                kpiData: state,
                newsData: newsresult,
                rtpmsData: rtpmsresult,
                budgetData: budgetresult,
                edits,
                contentHTML,
                date: today,
              }),
            })
            if (!res.ok) throw new Error(await res.text())
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'newsletter.pdf'
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
          } catch (err) {
            alert(`PDF generation failed: ${(err as Error).message}`)
          } finally {
            if (btn) { btn.disabled = false; btn.textContent = 'PDF ડાઉનલોડ કરો' }
          }
        }}
        id="export-pdf-btn"
        className="print:hidden fixed top-4 right-4 z-50 px-5 py-2.5 bg-[#163B7A] text-white font-['Noto_Sans_Gujarati',system-ui,sans-serif] text-sm font-semibold rounded shadow-lg hover:bg-[#0f2d5e] transition-colors cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
      >
        PDF ડાઉનલોડ કરો
      </button>
      <div className='print:hidden fixed top-4 left-3 z-50 flex gap-2'>
        <button className='py-2.5 bg-[#163B7A] text-white px-2.5 rounded-md' onClick={() => { window.location.reload() }}>Refresh</button>
        <button
          id='save-edits-btn'
          className='py-2.5 bg-[#2E7D32] text-white px-2.5 rounded-md disabled:opacity-60'
          onClick={async () => {
            const btn = document.getElementById('save-edits-btn') as HTMLButtonElement | null
            if (btn) { btn.disabled = true; btn.textContent = 'સેવ થઈ રહ્યું છે…' }
            try {
              await handleSaveEdits()
              if (btn) btn.textContent = 'સેવ થઈ ગયું ✓'
            } catch (err) {
              console.error(err)
              if (btn) btn.textContent = 'ભૂલ થઈ'
            } finally {
              setTimeout(() => {
                if (btn) { btn.disabled = false; btn.textContent = 'Save Edits' }
              }, 1500)
            }
          }}
        >
          Save Edits
        </button>
        <button
          id='reset-edits-btn'
          className='py-2.5 bg-[#B0271A] text-white px-2.5 rounded-md'
          onClick={handleResetEdits}
        >
          Reset
        </button>
        <span className='py-2.5 px-2 text-xs text-[#5A5A5A] self-center'>
          {Object.keys(edits).length} ફેરફાર
        </span>
      </div>
      <div
        id="newsletter-content"
        contentEditable
        suppressContentEditableWarning
        onBlur={handleContainerBlur}
        onKeyDown={(e) => {
          // Prevent formatting shortcuts
          if ((e.ctrlKey || e.metaKey) && ['b', 'i', 'u'].includes(e.key.toLowerCase())) {
            e.preventDefault()
          }
        }}
        className='w-screen h-screen flex justify-center items-center mt-[150px] outline-none'
      >
        <div className="print-wrapper relative w-[1668px] h-[1123px]">
          <div
            data-pencil-name="કાર્યકારી સંક્ષેપ · પૃષ્ઠ ૦૧"
            className="print-page box-border w-[794px] h-[1123px] absolute left-0 top-0 flex flex-col gap-[3px] p-[30px] justify-start items-start bg-[#FBF9F4] overflow-hidden"
          >
            <div
              data-pencil-name="Masthead"
              className="box-border w-full h-[100px] shrink-0 flex flex-col gap-0 justify-start items-start"
            >
              <div
                data-pencil-name="Top Rule 1"
                className="box-border w-full h-[2.5px] shrink-0 bg-[#163B7A]"
              ></div>
              <div
                data-pencil-name="Top Rule 2"
                className="box-border w-full h-[0.5px] shrink-0 bg-[#163B7A]"
              ></div>
              <div data-pencil-name="Center Row" className="box-border w-full h-[90px] shrink-0 relative">
                <div
                  data-pencil-name="Title Center"
                  className="box-border w-[514px] h-[75px] absolute left-[110px] top-[7.5px] flex flex-col gap-[4px] justify-center items-center [z-index:0]"
                >
                  <div
                    data-pencil-name="Main Title"
                    className="text-[30px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold tracking-[-0.3px] text-left [white-space:nowrap]"
                  >
                    માનનીય મુખ્યમંત્રીશ્રી માટેની સંક્ષિપ્ત નોંધ
                  </div>
                  <div
                    data-pencil-name="Eng Subtitle"
                    className="text-[8.5px]/[normal] box-border text-[#8A8A8A] font-['Funnel_Sans',system-ui,sans-serif] font-semibold tracking-[2px] text-left [white-space:nowrap]"
                  >
                    EXECUTIVE BRIEFING
                  </div>
                </div>
                <div
                  data-pencil-name="Metadata"
                  className="box-border w-[200px] h-[90px] absolute left-[534px] top-0 flex flex-col gap-[3px] p-[4px_0px] justify-start items-end [z-index:1]"
                >
                  <div
                    data-pencil-name="Date"
                    className="text-[13px]/[normal] box-border text-[#2C2C2C] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
                  >
                    શુક્રવાર, 03 જુલાઈ 2026
                  </div>
                  <div
                    data-pencil-name="Rule"
                    className="box-border w-[50px] h-[0.5px] shrink-0 bg-[#163B7A]"
                  ></div>
                  <div
                    data-pencil-name="Recipient"
                    className="text-[11px]/[normal] box-border text-[#2C2C2C] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                  >
                    મુખ્યમંત્રીશ્રી માટે
                  </div>
                  <div
                    data-pencil-name="classNameification"
                    className="text-[7px]/[normal] box-border text-[#B0271A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left [white-space:nowrap]"
                  >
                    ગોપનીય · આંતરિક વિતરણ
                  </div>
                </div>
              </div>
              <div
                data-pencil-name="Bottom Rule"
                className="box-border w-full h-[0.5px] shrink-0 bg-[#8a8484ff]"
              ></div>
            </div>
            <div
              data-pencil-name="Headline of the Day"
              className="box-border w-full h-fit shrink-0 flex flex-col gap-[4px] justify-start items-start"
            >
              {/* <div
                data-pencil-name="Label"
                className="text-[13px]/[normal] box-border text-[#E67E22] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
              >
                આજની મુખ્ય બાબત
              </div> */}
              {/* <div
                data-pencil-name="Headline"
                className="text-[32px]/[35px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium tracking-[-0.3px] text-left"
              >
                પ્રથમ ત્રૈમાસિકમાં 94.2% મૂડીખર્ચ: ગુજરાત ઐતિહાસિક ઊંચાઈ તરફ
              </div> */}
              {/* <div
                data-pencil-name="Summary"
                className="text-[13px]/[20px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
              >
                નાણાં વિભાગના અહેવાલ મુજબ 412 પ્રોજેક્ટમાં ₹18,427 કરોડનું વિતરણ. ખેતી, આરોગ્ય અને શહેરી
                વિકાસ શ્રેષ્ઠ. સાત જિલ્લાઓ સરેરાશ ખર્ચથી નીચે.
              </div> */}
              {/* <div
                data-pencil-name="Byline"
                className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left w-full min-w-0 break-words"
              >
                સ્ત્રોત: નાણાં વિભાગ · ત્રૈમાસિક કાર્યક્ષમતા અહેવાલ
              </div> */}
              <div
                data-pencil-name="Bottom Rule"
                className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
              ></div>
            </div>

            <div
              data-pencil-name="Three Column Editorial"
              className="box-border w-full [flex:1_1_0] flex flex-row gap-[20px] justify-start items-start"
            >
              <div
                data-pencil-name="Worst Performing Districts"
                className="box-border w-[346px] shrink-0 h-full flex flex-col gap-[8px] p-[6px_0px] justify-start items-start"
              >
                <div
                  data-pencil-name="Label"
                  className="text-[15px]/[normal] box-border text-[#B0271A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  સૌથી ખરાબ પ્રદર્શન · જિલ્લાઓ
                </div>
                <div
                  data-pencil-name="Rule"
                  className="box-border w-[216px] h-[2px] shrink-0 bg-[#B0271A]"
                ></div>
                <div
                  data-pencil-name="Title"
                  className="text-[24px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
                >
                  જિલ્લા માટે સમીક્ષા ના મુદ્દા
                </div>
                {groupedRtpms.map((group) => {
                  const districtKey = `district-${group.district}`
                  return (
                    <div
                      key={group.district}
                      data-pencil-name={`District ${group.district}`}
                      className="box-border w-full h-fit shrink-0 flex flex-col gap-[3px] p-[6px_0px] justify-start items-start"
                    >
                      <div
                        data-pencil-name="Top Rule"
                        className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                      ></div>
                      <div
                        data-pencil-name="Title Row"
                        className="box-border w-full h-fit shrink-0 flex flex-row gap-[6px] justify-start items-center"
                      >
                        <div
                          data-pencil-name="Arrow"
                          className="text-[16px]/[normal] box-border text-[#B0271A] font-[Inter,system-ui,sans-serif] font-semibold text-left shrink-0"
                        >
                          ▼
                        </div>
                        <div
                          data-pencil-name="Name"
                          data-edit-key={districtKey}
                          className="text-[22px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold tracking-[0.2px] text-left min-w-0 break-words"
                        >
                          {group.district}
                        </div>
                      </div>
                      <div
                        data-pencil-name="Bullets"
                        className="text-[15px]/[26px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left break-words"
                      >
                        {group.template_filled.map((tf, idx) => {
                          const bulletKey = `tf-${group.district}-${idx}`
                          return (
                            <div
                              key={idx}
                              data-pencil-name="Bullet"
                              data-edit-key={bulletKey}
                              className="break-words"
                            >
                              • {tf}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                <div
                  data-pencil-name="Bottom Rule"
                  className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                ></div>
              </div>
              <div
                data-pencil-name="KPI Highlight"
                className="box-border w-[346px] shrink-0 h-full flex flex-col gap-[8px] p-[24px] justify-start items-start bg-[#F1EEE8] [border:0.5px_solid_#2C2C2C]"
              >
                <div
                  data-pencil-name="Department"
                  data-edit-key="kpi-department"
                  className="text-[14px]/[18px] box-border text-[#163B7A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-left w-full min-w-0 break-words"
                >
                  રાજ્યનું બજેટ
                </div>
                {/* <div
                  data-pencil-name="Label"
                  className="text-[14px]/[normal] box-border text-[#E67E22] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  સપ્તાહનું મુખ્ય સૂચક
                </div> */}
                <div
                  data-pencil-name="Rule"
                  className="box-border w-[129px] h-[2px] shrink-0 bg-[#E67E22]"
                ></div>
                <div
                  data-pencil-name="KPI Row"
                  className="box-border w-full h-fit shrink-0 flex flex-col gap-[2px] justify-between items-start"
                >
                  <div
                    data-pencil-name="Micro Row"
                    className="box-border w-full mt-3 h-fit shrink-0 grid grid-cols-[1fr_auto] gap-[16px] items-start"
                  >
                    <div
                      data-pencil-name="M1"
                      data-edit-key="kpi-m1"
                      className="text-[14px]/[13px] box-border text-[#5A5A5A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-left w-full min-w-0 break-words"
                    >
                      <div className='text-[#8A8A8A]'>બજેટ જોગવાઈ</div>
                      <div className="text-[14px] mt-[1px] font-bold text-[#163B7A]">{m1Text}</div>
                    </div>
                    <div
                      data-pencil-name="M2"
                      data-edit-key="kpi-m2"
                      className="text-[14px]/[13px] box-border text-[#5A5A5A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-right min-w-0 break-words"
                    >
                      <div className='text-[#8A8A8A]'>ફાળવેલ ગ્રાન્ટ</div>
                      <div className="text-[14px] mt-[1px] font-bold text-[#163B7A]">{m2Text}</div>
                    </div>
                  </div>
                  <div
                    data-pencil-name="Sub Header"
                    data-edit-key="kpi-subheader"
                    className="mt-5 text-[14px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold tracking-[0.3px] text-left w-full min-w-0 break-words uppercase"
                  >
                    ખર્ચ
                  </div>
                  <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[5px] justify-between items-end">
                    <div className="flex flex-row gap-[5px] items-end">
                      <div
                        data-pencil-name="Number"
                        data-edit-key="kpi-number"
                        className="text-[54px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium tracking-[-2px] text-left [white-space:nowrap] "
                      >
                        {kpiPercentText} <span className='text-3xl'>%</span> <span className='text-[18px]'>{m3Text}</span>
                      </div>

                    </div>
                    <div
                      data-pencil-name="M3"
                      data-edit-key="kpi-m3"
                      className="text-[10px]/[13px] box-border text-[#5A5A5A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-right min-w-0 break-words"
                    >
                      {/* <div className='text-[14px] text-[#8A8A8A]'>ગ્રાન્ટ ખર્ચ</div>
                      <div className="text-[12px] mt-[1px] font-bold text-[#163B7A]">{m3Text}</div> */}
                    </div>
                  </div>
                </div>
                <div
                  data-pencil-name="Description"
                  data-edit-key="kpi-description"
                  className="text-[15px]/[normal] box-border text-[#2C2C2C] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left w-full min-w-0 break-words"
                >
                  ગ્રાન્ટ ટકાવારી (કુલ ફાળવણી સામે)
                </div>
                <div
                  data-pencil-name="Divider"
                  className="box-border w-full h-[1px] shrink-0 bg-[#DADADA]"
                ></div>

                <div
                  data-pencil-name="Caption"
                  className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  IFMS, નાણા વિભાગ
                </div>

                <div
                  data-pencil-name="Related Section"
                  className="box-border w-full h-fit shrink-0 flex flex-col gap-[4px] pt-[8px] border-t-[0.8px] border-t-[#2C2C2C] mt-[4px] justify-start items-start"
                >
                  {/* <div
         data-pencil-name="Related Label"
         data-edit-key="kpi-related-label"
         className="text-[12px]/[normal] box-border text-[#B0271A] font-[\'Noto_Sans_Gujarati\',system-ui,sans-serif] font-bold tracking-[0.1px] text-left w-full min-w-0 break-words"
       >
         નબળું પ્રદર્શન · વિભાગો
       </div> */}
                  <div
                    data-pencil-name="Related Row"
                    className="box-border w-full flex flex-col gap-[4px] justify-start items-start"
                  >
                    {budgetresult?.bottom_three && budgetresult.bottom_three.length > 0 ? (
                      budgetresult.bottom_three.map((dept, idx) => (
                        <div
                          key={idx}
                          data-pencil-name={`Related Item ${idx}`}
                          data-edit-key={`kpi-related-${idx}`}
                          className="box-border w-full flex flex-col gap-[1px] mt-5 border-t-[0.5px] border-t-[#DADADA] pt-[2px]"
                        >
                          <div
                            data-pencil-name="Related Title"
                            data-edit-key={`kpi-related-title-${idx}`}
                            className="text-[17px]/[15px] tracking-widest box-border text-[#163B7A] font-[\'Noto_Serif_Gujarati\',system-ui,sans-serif] font-bold text-left w-full min-w-0 break-words"
                          >
                            {dept.department_eng}
                          </div>
                          <div className="grid grid-cols-2 gap-[2px] mt-[1px] font-[\'Noto_Serif_Gujarati\',system-ui,sans-serif]">
                            <div className="text-[15px]/[13px] mt-2 text-[#5A5A5A]">
                              <span>બજેટ: </span>
                              <span className="font-bold">{dept.total_budget.toLocaleString("en-IN")} (Cr)</span>
                            </div>
                            <div className="text-[15px]/[13px] mt-2 text-[#5A5A5A]">
                              <span>ગ્રાન્ટ: </span>
                              <span className="font-bold">{dept.total_grant.toLocaleString("en-IN")} (Cr)</span>
                            </div>
                            <div className="text-[15px]/[13px] mt-2 text-[#5A5A5A]">
                              <span>ખર્ચ: </span>
                              <span className="font-bold">{dept.total_expenditure.toLocaleString("en-IN")} (Cr)</span>
                            </div>
                            <div className="text-[15px]/[13px] mt-2 text-[#5A5A5A]">
                              <span>બજેટ %: </span>
                              <span className="font-bold">{dept.budget_percentage.toFixed(2)}%</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-[10px]/[14px] text-[#8A8A8A] italic">ડેટા લોડ થઈ રહ્યું છે...</div>
                    )}
                  </div>
                </div>              </div>
            </div>
            <div
              data-pencil-name="Focus District News"
              className="box-border w-full [flex:1_1_0] flex flex-col gap-[10px] p-[4px_0px] justify-start items-start"
            >
              <div
                data-pencil-name="Label"
                className="mt-2 text-[15px]/[normal] box-border text-[#163B7A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
              >
                સૌથી ખરાબ પ્રદર્શન · વિભાગો
              </div>
              <div
                data-pencil-name="Rule"
                className="box-border w-[173px] h-[2px] shrink-0 bg-[#163B7A]"
              ></div>
              {/* <div
                data-pencil-name="Title"
                className="text-[28px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
              >
                સ્માર્ટ મોબિલિટી ફેઝ II શરૂ
              </div> */}
              <div
                data-pencil-name="Stories Row"
                className="box-border w-full [flex:1_1_0] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[16px] overflow-hidden"
              >
                {groupedAlerts.map((group) => (
                  <div
                    key={group.department_name}
                    data-pencil-name={`Dept ${group.department_name}`}
                    className="box-border w-full h-fit shrink-0 flex flex-col gap-[3px] border-t-[0.5px] border-t-[#DADADA] pt-[6px]"
                  >
                    <div
                      data-pencil-name="Name"
                      data-edit-key={`dept-name-${group.department_name}`}
                      className="text-[16px]/[20px] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left w-full min-w-0 break-words"
                    >
                      {group.department_name}
                    </div>
                    <div
                      data-pencil-name="Bullets"
                      className="text-[15px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left break-words"
                    >
                      {group.alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          data-pencil-name="Alert"
                          data-edit-key={`dept-alert-${group.department_name}-${idx}`}
                          className="break-words"
                        >
                          {alert
                            .split("।")
                            .map((s) => s.trim())
                            .filter((s) => s.length > 0)
                            .map((sentence, sIdx) => (
                              <div key={sIdx} className="flex gap-[6px] mb-[3px]">
                                <span className="text-[#B0271A] font-bold shrink-0">▸</span>
                                <span>{sentence}।</span>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              data-pencil-name="Footer"
              className="box-border w-full h-[24px] shrink-0 flex flex-col gap-0 justify-start items-start"
            >
              <div
                data-pencil-name="Footer Rule"
                className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
              ></div>
              <div
                data-pencil-name="Footer Bar"
                className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] p-[6px_0px_0px_0px] justify-start items-center"
              >
                <div
                  data-pencil-name="Footer Left"
                  className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  માનનીય મુખ્યમંત્રીશ્રી માટેની સંક્ષિપ્ત નોંધ
                </div>
                <div
                  data-pencil-name="Footer Spacer"
                  className="box-border [flex:1_1_0] h-[1px] flex flex-row gap-0 justify-start items-start"
                ></div>
                <div
                  data-pencil-name="Footer Right"
                  className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  પૃષ્ઠ 01 · આગળ પૃષ્ઠ 02
                </div>
              </div>
            </div>
          </div>
          <div
            data-pencil-name="કાર્યકારી સંક્ષેપ · પૃષ્ઠ ૦૨"
            className="print-page box-border w-[794px] h-[1123px] absolute left-[874px] top-0 flex flex-col gap-[3px] p-[30px] justify-start items-start bg-[#FBF9F4] overflow-hidden"
          >
            <div
              data-pencil-name="Continuation Header"
              className="box-border w-full h-[30px] shrink-0 flex flex-col gap-0 justify-start items-start"
            >
              <div
                data-pencil-name="Top Rule"
                className="box-border w-full h-[2px] shrink-0 bg-[#163B7A]"
              ></div>
              <div
                data-pencil-name="Cont Row"
                className="box-border w-full h-[24px] shrink-0 flex flex-row gap-[12px] p-[3px_0px_0px_0px] justify-start items-center"
              >
                <div
                  data-pencil-name="Label"
                  className="text-[10px]/[normal] box-border text-[#163B7A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  પૃષ્ઠ ૦૨ · વિગતવાર વિશ્લેષણ
                </div>
                <div
                  data-pencil-name="Spacer"
                  className="box-border [flex:1_1_0] h-[1px] flex flex-row gap-0 justify-start items-start"
                ></div>
                <div
                  data-pencil-name="Tag"
                  className="text-[11px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  વિભાગીય અને જિલ્લા સ્તરનું ઊંડાણપૂર્વક વિશ્લેષણ
                </div>
              </div>
            </div>
            <div
              data-pencil-name="Departments and Feature Row"
              className="box-border w-full [flex:1_1_0] flex flex-row gap-[16px] justify-start items-start"
            >
              <div
                data-pencil-name="Departments Column"
                className="box-border w-[340px] shrink-0 h-full flex flex-col gap-[20px] justify-start items-start"
              >
                <div
                  data-pencil-name="Worst Performing Departments"
                  className="box-border w-full [flex:1_1_0] flex flex-col gap-[2px] justify-start items-start"
                >
                  <div
                    data-pencil-name="WPDepts Header"
                    className="box-border w-full h-fit shrink-0 flex flex-col gap-[5px] justify-start items-start"
                  >
                    <div
                      data-pencil-name="Label"
                      className="text-[15px]/[normal] box-border text-[#B0271A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                    >
                      સૌથી ખરાબ પ્રદર્શન · વિભાગો
                    </div>
                    <div
                      data-pencil-name="Rule"
                      className="box-border w-[211px] h-[3px] shrink-0 bg-[#B0271A]"
                    ></div>
                    {/* <div
                      data-pencil-name="Title"
                      className="text-[24px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
                    >
                      લક્ષ્યાંકથી નીચેના વિભાગો
                    </div> */}
                    {pragatiresult &&
                      pragatiresult.length > 0 &&
                      pragatiresult.slice(0, 3).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          data-pencil-name={`Related Item ${idx}`}
                          className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start"
                        >
                          <div
                            data-pencil-name="Lead Column"
                            className="box-border flex-1 min-w-0 h-fit flex flex-col gap-[6px] justify-start items-start"
                          >
                            {/* Headline */}
                            <div
                              data-pencil-name="Related Title"
                              data-edit-key={`kpi-related-title-${idx}`}
                              className="w-full text-[16px]/[22px] text-[#163B7A] font-bold text-left break-words"
                            >
                              {item.name_of_project}
                            </div>

                            {/* Body */}
                            <div
                              data-pencil-name="Related Body"
                              data-edit-key={`kpi-related-body-${idx}`}
                              className="w-full text-[17px]/[22px] text-[#5A5A5A] text-left break-words font-['Noto_Sans_Gujarati',system-ui,sans-serif]"
                            >
                              {item.statement_gujarati}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* alerts here */}

                  {/* {groupedAlerts.map((group) => (
                    <>
                      <div
                        data-pencil-name={`Dept ${group.department_name}`}
                        className="box-border w-full h-fit shrink-0 flex flex-col mb-3 gap-[2px] p-[3px_0px] justify-start items-start"
                      >
                        <div
                          data-pencil-name="Top Rule"
                          className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                        ></div>
                        <div
                          data-pencil-name="Name"
                          data-edit-key={`dept-name-${group.department_name}`}
                          className="text-[16px]/[20px] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left w-full min-w-0 break-words"
                        >
                          {group.department_name}
                        </div>
                        <div
                          data-pencil-name="Bullets"
                          className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left break-words"
                        >
                          {group.alerts.map((alert, idx) => (
                            <div
                              key={idx}
                              data-pencil-name="Alert"
                              data-edit-key={`dept-alert-${group.department_name}-${idx}`}
                              className="break-words"
                            >
                              {alert}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ))} */}


                  {/* alerts end here */}

                  <div
                    data-pencil-name="WPDepts Bottom Rule"
                    className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                  ></div>
                </div>
                <div
                  data-pencil-name="Focus Department News"
                  className="box-border w-full [flex:1_1_0] flex flex-col gap-[2px] justify-start items-start"
                >
                  <div
                    data-pencil-name="FocusDept Header"
                    className="box-border w-full h-fit shrink-0 flex flex-col gap-[5px] justify-start items-start"
                  >
                    <div
                      data-pencil-name="Label"
                      className="text-[15px]/[normal] box-border text-[#163B7A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                    >
                      ફોકસ વિભાગ
                    </div>
                    <div
                      data-pencil-name="Rule"
                      className="box-border w-[303px] h-[3px] shrink-0 bg-[#163B7A]"
                    ></div>
                  </div>
                  {groupedFocusDept.map((group) => (
                    <div
                      key={group.department}
                      data-pencil-name={`FocusDept ${group.department}`}
                      className="box-border w-full shrink-0 flex flex-col gap-[3px] pt-[4px] border-t-[0.5px] border-t-[#DADADA]"
                    >
                      <div
                        data-pencil-name="Dept Name"
                        data-edit-key={`fdept-name-${group.department}`}
                        className="text-[20px]/[18px] mb-5 box-border text-[#163B7A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold text-left w-full min-w-0 break-words"
                      >
                        {group.department}
                      </div>
                      <div className="flex flex-col gap-[4px] w-full">
                        {group.items.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            data-pencil-name="News Item"
                            data-edit-key={`fdept-item-${group.department}-${idx}`}
                            className="flex flex-col gap-[2px]"
                          >
                            <div className="flex gap-[4px]">
                              <span className="text-[#E67E22] font-bold shrink-0">▸</span>
                              <span className="text-[20px]/[17px] text-[#E67E22] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold text-left break-words">
                                {item.headline}
                              </span>
                            </div>
                            <div className="text-[14px]/[16px] mt-5 text-[#5A5A5A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal text-left break-words pl-[14px]">
                              {item.body}
                            </div>
                            {item.district && (
                              <div className="text-[13px]/[14px] mb-3 text-[#8A8A8A] pl-[14px]">
                                {item.district}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                data-pencil-name="Negative News Highlights"
                className="box-border [flex:1_1_0] h-full flex flex-col gap-[12px] justify-start items-start"
              >
                <div
                  data-pencil-name="NegHeader"
                  className="box-border w-full h-fit shrink-0 flex flex-row gap-[12px] p-[0px_0px_12px_0px] justify-start items-center"
                >
                  <div
                    data-pencil-name="Label"
                    className="text-[15px]/[normal] box-border text-[#B0271A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left shrink-0"
                  >
                    નકારાત્મક અહેવાલ
                  </div>
                  <div
                    data-pencil-name="Spacer"
                    className="box-border [flex:1_1_0] h-[1px] flex flex-row gap-0 justify-start items-start"
                  ></div>
                  <div
                    data-pencil-name="Page Tag"
                    className="text-[11px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left shrink-0"
                  >
                    પૃષ્ઠ ૦૨ · આગળ પૃષ્ઠ ૦૩
                  </div>
                </div>
                <div
                  data-pencil-name="Header Rule"
                  className="box-border w-full h-[2px] shrink-0 bg-[#B0271A]"
                ></div>
                <div className="flex flex-col gap-[16px] w-full [flex:1_1_0] overflow-hidden">
                  {newsresult.slice(0, 3).map((result) => (
                    <div
                      key={result.id}
                      data-pencil-name="FeatureBody"
                      className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start"
                    >
                      <div
                        data-pencil-name="Lead Column"
                        className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[6px] justify-start items-start"
                      >
                        <div
                          data-pencil-name="Kicker"
                          data-edit-key="neg-kicker-"
                          className="text-[11px]/[normal] text-[#5A5A5A] text-left min-w-0 break-words w-full"
                        >
                          {result.article_category}
                        </div>
                        <div
                          data-pencil-name="Headline"
                          data-edit-key="neg-headline-"
                          className="text-[16px]/[22px] w-full text-[#163B7A] font-extrabold text-left min-w-0 break-words"
                        >
                          {result.summary_headline}
                        </div>
                        <div
                          data-pencil-name="Byline"
                          data-edit-key="neg-byline-"
                          className="text-[11px]/[normal] text-[#8A8A8A] text-left min-w-0 break-words w-full"
                        >
                          {result.district}
                        </div>
                        <div
                          data-pencil-name="Body"
                          data-edit-key="neg-body-"
                          className="text-[14px]/[22px] w-full text-[#5A5A5A] text-left min-w-0 break-words"
                        >
                          {result.summary_body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              data-pencil-name="Positive News Highlights"
              className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start"
            >
              <div
                data-pencil-name="PosHeader"
                className="box-border w-full h-fit shrink-0 flex flex-row gap-[12px] p-[0px_0px_8px_0px] justify-start items-center"
              >
                <div
                  data-pencil-name="Label"
                  className="text-[16px]/[normal] box-border text-[#E67E22] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  સકારાત્મક અહેવાલ · સંપાદકીય
                </div>
                <div
                  data-pencil-name="Header Spacer"
                  className="box-border [flex:1_1_0] h-[1px] flex flex-row gap-0 justify-start items-start"
                ></div>
                <div
                  data-pencil-name="Caption"
                  className="text-[12px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  સમાપન · અઠવાડિયું ૨૭, ૨૦૨૬
                </div>
              </div>
              <div
                data-pencil-name="Header Rule"
                className="box-border w-full h-[3px] shrink-0 bg-[#E67E22]"
              ></div>
              <div
                data-pencil-name="Positive Row"
                className="box-border w-full h-fit shrink-0 flex flex-row gap-[28px] justify-start items-start"
              >
                {positive_news && positive_news.slice(0, 4).map((result, index) => (
                  <div
                    key={index}
                    data-pencil-name={`Pos માળખાગત`}
                    className="box-border [flex:1_1_0] h-fit flex flex-col gap-[8px] p-[14px_0px_0px_0px] justify-start items-start"
                  >
                    <div
                      data-pencil-name="Top Row"
                      className="box-border w-fit h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center"
                    >
                      <div
                        data-pencil-name="Number"
                        data-edit-key={`pos-number-${result.id}`}
                        className="text-[24px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left"
                      >
                        {index + 1}
                      </div>
                      <div
                        data-pencil-name="Tag"
                        data-edit-key={`pos-tag-${result.id}`}
                        className="text-[11px]/[normal] box-border text-[#163B7A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left"
                      >
                        {result.department}
                      </div>
                    </div>
                    <div
                      data-pencil-name="Title"
                      data-edit-key={`pos-title-${result.id}`}
                      className="text-[20px]/[24px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left break-words"
                    >
                      {result.summary_headline}
                    </div>
                    <div
                      data-pencil-name="Body"
                      data-edit-key={`pos-body-${result.id}`}
                      className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left break-words"
                    >
                      {result.summary_body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              data-pencil-name="Footer 2"
              className="box-border w-full h-[24px] shrink-0 flex flex-col gap-0 justify-start items-start"
            >
              <div
                data-pencil-name="Footer Rule"
                className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
              ></div>
              <div
                data-pencil-name="Footer Bar"
                className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] p-[8px_0px_0px_0px] justify-start items-center"
              >
                <div
                  data-pencil-name="Footer Left"
                  className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  માનનીય મુખ્યમંત્રીશ્રી માટેની સંક્ષિપ્ત નોંધ
                </div>
                <div
                  data-pencil-name="Footer Spacer"
                  className="box-border [flex:1_1_0] h-[1px] flex flex-row gap-0 justify-start items-start"
                ></div>
                <div
                  data-pencil-name="Footer Right"
                  className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  પૃષ્ઠ 02 · આવૃત્તિ સમાપ્ત · આગામી અંક 06 જુલાઈ 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App