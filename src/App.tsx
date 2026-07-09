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
  wisi: number;
  sr_no: number;
  kpi_id: number;
  source: string;
  officer: string;
  district: string;
  kpi_name: string;
  department: string;
  template_filled: string;
}


interface RtPmsInterface {
  id: number;
  source_id: string;
  data: RTPMSDataInterface;
  created_at: string;
}

interface BudgetDataInterface {
  id: string;
  source: string;
  total_grant: number;
  prabhag_name: string;
  total_budget: number;
  department_eng: string;
  grant_percentage: number;
  budget_percentage: number;
  total_expenditure: number;
}

interface BudgetResponseInterface {
  id: number;
  source_id: string;
  prabhag_name: string;
  department_eng: string;
  data: BudgetDataInterface;
  created_at: string;
}

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

  const [budgetresult, setbudgetResult] = useState<BudgetResponseInterface[]>(() => {
    const injected = (window as { __injectedBudgetData?: unknown }).__injectedBudgetData;
    return Array.isArray(injected) ? (injected as BudgetResponseInterface[]) : [];
  });

  const today = useMemo(
    () => new Intl.DateTimeFormat('sv-SE').format(new Date()),
    []
  );

  // const today = "2026-07-08"

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
  const negative_news = newsresult.filter((value) => value.news_type == 'negative');
  const focus_district = newsresult.filter((value) => value.news_type == 'focused district')
  const focus_department = newsresult.filter((value) => value.news_type == 'focused department')

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
        `https://swar-api.gujarat.gov.in/newsletter-api/alerts?date=${today}&limit=50&offset=0`
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

    // budget
    if (Array.isArray(w.__injectedBudgetData)) {
      w.__budgetLoaded = true;
    } else {
      fetch(
        `https://swar-api.gujarat.gov.in/newsletter-api/budget?date=${today}&limit=50&offset=0`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("budget data:", data);

          const budget = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : [];

          setbudgetResult(budget);
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
      const d = item.data?.district;
      if (!d) continue;
      const existing = map.get(d);
      if (existing) {
        if (item.data.template_filled) {
          existing.template_filled.push(item.data.template_filled);
        }
      } else {
        map.set(d, {
          district: d,
          template_filled: item.data.template_filled ? [item.data.template_filled] : [],
        });
      }
    }
    return Array.from(map.values()).slice(0, 3);
  }, [rtpmsresult]);

  const primaryBudget = useMemo(() => budgetresult[0], [budgetresult]);
  const budgetPercent = primaryBudget?.data?.grant_percentage;
  const budgetPrabhag = primaryBudget?.prabhag_name ?? primaryBudget?.data?.prabhag_name ?? "";
  const budgetTotal = primaryBudget?.data?.total_budget;
  const budgetGrant = primaryBudget?.data?.total_grant;
  const kpiPercentText = typeof budgetPercent === "number" ? `${budgetPercent.toFixed(2)}%` : "94.2%";
  const kpiSubHeaderText = budgetPrabhag || "મૂડીખર્ચ સિદ્ધિ";
  const m1Text = typeof budgetTotal === "number"
    ? `બજેટ જોગવાઈ: ${budgetTotal.toLocaleString("en-IN")} કરોડ`
    : "બજેટ જોગવાઈ: N/A";
  const m2Text = typeof budgetGrant === "number"
    ? `ફાળવેલ ગ્રાન્ટ: ${budgetGrant.toLocaleString("en-IN")} કરોડ`
    : "ફાળવેલ ગ્રાન્ટ: N/A";

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
              <div
                data-pencil-name="Summary"
                className="text-[13px]/[20px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
              >
                નાણાં વિભાગના અહેવાલ મુજબ 412 પ્રોજેક્ટમાં ₹18,427 કરોડનું વિતરણ. ખેતી, આરોગ્ય અને શહેરી
                વિકાસ શ્રેષ્ઠ. સાત જિલ્લાઓ સરેરાશ ખર્ચથી નીચે.
              </div>
              <div
                data-pencil-name="Byline"
                className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left w-full min-w-0 break-words"
              >
                સ્ત્રોત: નાણાં વિભાગ · ત્રૈમાસિક કાર્યક્ષમતા અહેવાલ
              </div>
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
                className="box-border w-[346px] shrink-0 h-full flex flex-col gap-[14px] p-[24px] justify-start items-start bg-[#F1EEE8] [border:0.5px_solid_#2C2C2C]"
              >
                <div
                  data-pencil-name="Label"
                  className="text-[14px]/[normal] box-border text-[#E67E22] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  સપ્તાહનું મુખ્ય સૂચક
                </div>
                <div
                  data-pencil-name="Rule"
                  className="box-border w-[129px] h-[2px] shrink-0 bg-[#E67E22]"
                ></div>
                <div
                  data-pencil-name="KPI Row"
                  className="box-border w-full h-fit shrink-0 flex flex-col gap-[2px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Sub Header"
                    data-edit-key="kpi-subheader"
                    className="text-[14px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold tracking-[0.3px] text-left w-full min-w-0 break-words uppercase"
                  >
                    {kpiSubHeaderText}
                  </div>
                  <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[5px] justify-start items-start">
                    <div
                      data-pencil-name="Number"
                      data-edit-key="kpi-number"
                      className="text-[64px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium tracking-[-2px] text-left [white-space:nowrap]"
                    >
                      {kpiPercentText}
                    </div>
                    <div
                      data-pencil-name="Trend"
                      className="text-[28px]/[normal] box-border text-[#E67E22] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                    >
                      ▲
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
                  data-pencil-name="Micro Row"
                  className="box-border w-full h-fit shrink-0 flex flex-col gap-[4px] p-[6px_0px_0px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="M1"
                    data-edit-key="kpi-m1"
                    className="text-[12px]/[18px] box-border text-[#5A5A5A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-left w-full min-w-0 break-words"
                  >
                    {m1Text}
                  </div>
                  <div
                    data-pencil-name="M2"
                    data-edit-key="kpi-m2"
                    className="text-[12px]/[18px] box-border text-[#5A5A5A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-left w-full min-w-0 break-words"
                  >
                    {m2Text}
                  </div>
                </div>
                <div
                  data-pencil-name="Caption"
                  className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left [white-space:nowrap]"
                >
                  સ્ત્રોત: નાણાં વિભાગ
                </div>
              </div>
            </div>
            <div
              data-pencil-name="Focus District News"
              className="box-border w-full [flex:1_1_0] flex flex-col gap-[10px] p-[4px_0px] justify-start items-start"
            >
              <div
                data-pencil-name="Label"
                className="text-[15px]/[normal] box-border text-[#163B7A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
              >
                ફોકસ જિલ્લો · અમદાવાદ
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
                className="box-border w-full [flex:1_1_0] flex flex-row gap-[24px] justify-start items-start"
              >
                {
                  focus_district && focus_district.splice(0, 3).map((result) => (
                    <>
                      <div
                        data-pencil-name="Story AMRUT 2.0"
                        className="box-border w-[229px] shrink-0 h-fit flex flex-col gap-[6px] p-[8px_0px] justify-start items-start"
                      >
                        <div
                          data-pencil-name="Title"
                          data-edit-key={`fd-title-${result.id}`}
                          className="text-[20px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left break-words"
                        >
                          ▸ {result.summary_headline}
                        </div>
                        <div
                          data-pencil-name="Body"
                          data-edit-key={`fd-body-${result.id}`}
                          className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left break-words"
                        >
                          {result.summary_body}
                        </div>
                      </div>
                    </>
                  ))
                }
                {/* <div
                  data-pencil-name="Story મેટ્રો ફેઝ-2"
                  className="box-border w-[229px] shrink-0 h-fit flex flex-col gap-[6px] p-[8px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Title"
                    className="text-[20px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
                  >
                    ▸ મેટ્રો ફેઝ-2
                  </div>
                  <div
                    data-pencil-name="Body"
                    className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    4.8 લાખ મુસાફરો/દિવસ, 23% વધુ. કાંકરિયા લેકફ્રન્ટ ઉદ્ઘાટન. 3 મેટ્રો લાઇન્સ મંજૂર —
                    થલતેજ-બોપલ, અક્ષરધામ-ગાંધીનગર, નરોડા-વટવા. 47 નવા સ્ટેશન.
                  </div>
                </div> */}
                {/* <div
                  data-pencil-name="Story EV ઈન્ફ્રાસ્ટ્રક્ચર"
                  className="box-border w-[229px] shrink-0 h-fit flex flex-col gap-[6px] p-[8px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Title"
                    className="text-[20px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
                  >
                    ▸ EV ઈન્ફ્રાસ્ટ્રક્ચર
                  </div>
                  <div
                    data-pencil-name="Body"
                    className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    12 EV ચાર્જિંગ સ્ટેશન કાર્યરત. મ્યુનિસિપલ બોન્ડ 3.2 ગણું ઓવરસબ્સ્ક્રાઇબ. ₹2,400 Cr
                    રોકાણ. GIDC 18 નવા પ્રોજેક્ટ્સ મંજૂર. 78% ગ્રીન energy.
                  </div>
                </div> */}
                <div
                  data-pencil-name="Top Rule"
                  className="box-border [flex:1_1_0] h-[0.5px] bg-[#DADADA]"
                ></div>
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
                    <div
                      data-pencil-name="Title"
                      className="text-[24px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
                    >
                      લક્ષ્યાંકથી નીચેના વિભાગો
                    </div>
                    {/* <div
                      data-pencil-name="Subtitle"
                      className="text-[14px]/[21px] box-border text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left [white-space:nowrap]"
                    >
                      Q1 FY ૨૦૨૬-૨૭ · ૨૨ વિભાગોમાંથી ૮ ધ્યાન આપવાલાયક
                    </div> */}
                  </div>




                  {/* alerts here */}

                  {
                    alertresult && alertresult.slice(0, 4).map((result) => (
                      <>
                        <div
                          data-pencil-name="Dept શહેરી વિકાસ વિભાગ"
                          className="box-border w-full h-fit shrink-0 flex flex-col mb-3 gap-[1px] p-[3px_0px] justify-start items-start"
                        >
                          <div
                            data-pencil-name="Top Rule"
                            className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                          ></div>
                          <div
                            data-pencil-name="Title Row"
                            className="box-border w-fit h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center"
                          >
                            <div
                              data-pencil-name="Arrow"
                              className="text-[17px]/[normal] box-border text-[#B0271A] font-[Inter,system-ui,sans-serif] font-semibold text-left shrink-0"
                            >
                              ▼
                            </div>
                            <div
                              data-pencil-name="Name"
                              data-edit-key={`dept-name-${result.id}`}
                              className="text-[18px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left min-w-0 break-words"
                            >
                              {result.department_name}
                            </div>
                          </div>
                          <div
                            data-pencil-name="Bullets"
                            data-edit-key={`dept-bullets-${result.id}`}
                            className="text-[16px]/[25px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left break-words"
                          >
                            • {result.alert_statement_gujarati}
                          </div>
                        </div>
                      </>
                    ))
                  }


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
                      ફોકસ વિભાગ · આરોગ્ય અને કુટુંબ કલ્યાણ
                    </div>
                    <div
                      data-pencil-name="Rule"
                      className="box-border w-[303px] h-[3px] shrink-0 bg-[#163B7A]"
                    ></div>
                    {/* <div
                      data-pencil-name="Title"
                      className="text-[24px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
                    >
                      આયુષ્માન ભારત: 2.14 Cr લાભાર્થી
                    </div> */}
                  </div>
                  {
                    focus_department && focus_department.splice(0, 3).map((result) => (
                      <>
                        <div
                          data-pencil-name="Story OPD ડિજિટાઈઝેશન"
                          className="box-border w-full [flex:1_1_0] flex flex-col gap-[2px] p-[4px_0px] justify-start items-start"
                        >
                          <div
                            data-pencil-name="Top Rule"
                            className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                          ></div>
                          <div
                            data-pencil-name="Title"
                            data-edit-key={`fdept-title-${result.id}`}
                            className="text-[18px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left break-words"
                          >
                            ▸ {result.department}
                          </div>
                          <div
                            data-pencil-name="Body"
                            data-edit-key={`fdept-body-${result.id}`}
                            className="text-[16px]/[26px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left break-words"
                          >
                            {result.summary_body}
                          </div>
                        </div>
                      </>
                    ))
                  }
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
                  {
                    negative_news.slice(0, 3)?.map((result) => (
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
                            data-edit-key={`neg-kicker-${result.id}`}
                            className="text-[11px]/[normal] text-[#5A5A5A]  text-left min-w-0 break-words w-full"
                          >
                            {result.article_category}
                          </div>

                          <div
                            data-pencil-name="Headline"
                            data-edit-key={`neg-headline-${result.id}`}
                            className="text-[16px]/[22px] w-full text-[#163B7A] font-extrabold text-left min-w-0 break-words"
                          >
                            {result.summary_headline}
                          </div>

                          <div
                            data-pencil-name="Byline"
                            data-edit-key={`neg-byline-${result.id}`}
                            className="text-[11px]/[normal] text-[#8A8A8A] text-left min-w-0 break-words w-full"
                          >
                            {result.district}
                            {result.department !== "N/A"}
                          </div>

                          <div
                            data-pencil-name="Body"
                            data-edit-key={`neg-body-${result.id}`}
                            className="text-[14px]/[22px] w-full text-[#5A5A5A] text-left min-w-0 break-words"
                          >
                            {result.summary_body}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  {newsresult.length === 0 && (
                    <div className="text-[14px]/[22px] text-[#8A8A8A] text-left">કોઈ નકારાત્મક અહેવાલ ઉપલબ્ધ નથી</div>
                  )}
                </div>
                <div
                  data-pencil-name="Related Section"
                  className="box-border w-full h-fit shrink-0 flex flex-col gap-[6px] p-[12px_0px_0px_0px] justify-start items-start"
                >
                  {/* <div
                    data-pencil-name="Divider"
                    className="box-border w-full h-[0.8px] shrink-0 bg-[#2C2C2C]"
                  ></div> */}
                  {/* <div
                    data-pencil-name="Related Label"
                    className="text-[12px]/[normal] box-border text-[#2C2C2C] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                  >
                    સંબંધિત · સંક્ષેપમાં
                  </div> */}
                  {/* <div
                    data-pencil-name="Related Row"
                    className="box-border w-full [flex:1_1_0] flex flex-row gap-[12px] justify-start items-start"
                  >
                    <div
                      data-pencil-name="Related આરોગ્ય"
                      className="box-border [flex:1_1_0] h-full flex flex-col gap-[1px] p-[4px_0px_0px_0px] justify-start items-start"
                    >
                      <div
                        data-pencil-name="Tag"
                        className="text-[11px]/[normal] box-border text-[#B0271A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                      >
                        આરોગ્ય
                      </div>
                      <div
                        data-pencil-name="Title"
                        className="text-[18px]/[23px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left"
                      >
                        TB દવાની અછત
                      </div>
                      <div
                        data-pencil-name="Body"
                        className="text-[16px]/[23px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                      >
                        14 PHCમાં દર્દીઓ બાહ્ય ફાર્મસી તરફ.
                      </div>
                    </div>
                    <div
                      data-pencil-name="Related શિક્ષણ"
                      className="box-border [flex:1_1_0] h-full flex flex-col gap-[1px] p-[4px_0px_0px_0px] justify-start items-start"
                    >
                      <div
                        data-pencil-name="Tag"
                        className="text-[11px]/[normal] box-border text-[#B0271A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                      >
                        શિક્ષણ
                      </div>
                      <div
                        data-pencil-name="Title"
                        className="text-[18px]/[23px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left"
                      >
                        મધ્યાહન ભોજન ઓડિટ
                      </div>
                      <div
                        data-pencil-name="Body"
                        className="text-[16px]/[23px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                      >
                        દાહોદ-છોટા ઉદેપુરમાં 23% નમૂના નબળા.
                      </div>
                    </div>
                    <div
                      data-pencil-name="Related ઉદ્યોગ"
                      className="box-border [flex:1_1_0] h-full flex flex-col gap-[1px] p-[4px_0px_0px_0px] justify-start items-start"
                    >
                      <div
                        data-pencil-name="Tag"
                        className="text-[11px]/[normal] box-border text-[#B0271A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                      >
                        ઉદ્યોગ
                      </div>
                      <div
                        data-pencil-name="Title"
                        className="text-[18px]/[23px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left"
                      >
                        MSME પાવર કટ
                      </div>
                      <div
                        data-pencil-name="Body"
                        className="text-[16px]/[23px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                      >
                        દૈનિક 6 કલાક પાવર કટ; ઉત્પાદન પ્રભાવિત.
                      </div>
                    </div>
                  </div> */}
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
              {/* positive news start */}
              <div
                data-pencil-name="Header Rule"
                className="box-border w-full h-[3px] shrink-0 bg-[#E67E22]"
              ></div>
              <div
                data-pencil-name="Positive Row"
                className="box-border w-full h-fit shrink-0 flex flex-row gap-[28px] justify-start items-start"
              >
                {positive_news && positive_news.map((result, index) => (
                  <>
                    <div
                      data-pencil-name="Pos માળખાગત"
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
                  </>
                ))}
              </div>
              {/* positive news end */}
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