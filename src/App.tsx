import React, { useState } from 'react'

const App = () => {
  const [state, setState] = useState([
    {
      "kpiID": 26,
      "KPIName": "Applications pending more than 90 days under City Survey",
      "dcode": 1,
      "DistrictName": "Kachchh",
      "Dept_name": "REVENUE",
      "segment": "Core Revenue Activity",
      "data_to_be_process": "As On Date",
      "valuetype": 2,
      "KPI_Type": "Negative",
      "Numerator": 0,
      "Denominator": 0,
      "Per": 0,
      "weightage": 1.5,
      "scaleValue": 100,
      "wisi": 150,
      "AsOnDate": "15:49.2"
    },
    {
      "kpiID": 27,
      "KPIName": "Cases pending more than 6 months under Other Cases - Prant Office",
      "dcode": 1,
      "DistrictName": "Kachchh",
      "Dept_name": "REVENUE",
      "segment": "Core Revenue Activity",
      "data_to_be_process": "Last Completed Month on 10th day",
      "valuetype": 2,
      "KPI_Type": "Negative",
      "Numerator": 12,
      "Denominator": 0,
      "Per": 12,
      "weightage": 1,
      "scaleValue": 97.95,
      "wisi": 97.95,
      "AsOnDate": "15:48.7"
    },
    {
      "kpiID": 28,
      "KPIName": "% Applications pending out of time limit under iORA (All Channel)",
      "dcode": 1,
      "DistrictName": "Kachchh",
      "Dept_name": "REVENUE",
      "segment": "Core Revenue Activity",
      "data_to_be_process": "As On Date",
      "valuetype": 1,
      "KPI_Type": "Negative",
      "Numerator": 145,
      "Denominator": 517,
      "Per": 28.05,
      "weightage": 2,
      "scaleValue": 44.2,
      "wisi": 88.4,
      "AsOnDate": "15:48.4"
    }
  ])
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center mt-[150px]'>
        <div className="relative w-[1668px] h-[1123px]">
          <div
            data-pencil-name="કાર્યકારી સંક્ષેપ · પૃષ્ઠ ૦૧"
            className="box-border w-[794px] h-[1123px] absolute left-0 top-0 flex flex-col gap-[3px] p-[30px] justify-start items-start bg-[#FBF9F4] overflow-hidden"
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
              className="box-border w-full h-[140px] shrink-0 flex flex-col gap-[4px] justify-start items-start"
            >
              <div
                data-pencil-name="Label"
                className="text-[13px]/[normal] box-border text-[#E67E22] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
              >
                આજની મુખ્ય બાબત
              </div>
              <div
                data-pencil-name="Headline"
                className="text-[32px]/[35px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium tracking-[-0.3px] text-left"
              >
                પ્રથમ ત્રૈમાસિકમાં 94.2% મૂડીખર્ચ: ગુજરાત ઐતિહાસિક ઊંચાઈ તરફ
              </div>
              <div
                data-pencil-name="Summary"
                className="text-[13px]/[20px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
              >
                નાણાં વિભાગના અહેવાલ મુજબ 412 પ્રોજેક્ટમાં ₹18,427 કરોડનું વિતરણ. ખેતી, આરોગ્ય અને શહેરી
                વિકાસ શ્રેષ્ઠ. સાત જિલ્લાઓ સરેરાશ ખર્ચથી નીચે.
              </div>
              <div
                data-pencil-name="Byline"
                className="text-[10px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left [white-space:nowrap]"
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
                <div
                  data-pencil-name="District બોટાદ"
                  className="box-border w-full h-fit shrink-0 flex flex-col gap-[3px] p-[6px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Top Rule"
                    className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                  ></div>
                  <div
                    data-pencil-name="Title Row"
                    className="box-border w-fit h-fit shrink-0 flex flex-row gap-[6px] justify-start items-center"
                  >
                    <div
                      data-pencil-name="Arrow"
                      className="text-[16px]/[normal] box-border text-[#B0271A] font-[Inter,system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                    >
                      ▼
                    </div>
                    <div
                      data-pencil-name="Name"
                      className="text-[22px]/[normal] box-border text-[#2C2C2C] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold tracking-[0.2px] text-left [white-space:nowrap]"
                    >
                      {state[0].DistrictName}
                    </div>
                  </div>
                  <div
                    data-pencil-name="Bullets"
                    className="text-[15px]/[26px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    • મૂડીખર્ચ 38.2%, લક્ષ્યાંક કરતાં 14.7% ઓછું
                    <br />
                    • 47 પ્રોજેક્ટ બાકી, 23 દિવસ વિલંબ
                    <br />
                    • 12 ફરિયાદો પેન્ડિંગ
                  </div>
                </div>
                <div
                  data-pencil-name="District ડાંગ"
                  className="box-border w-full h-fit shrink-0 flex flex-col gap-[3px] p-[6px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Top Rule"
                    className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                  ></div>
                  <div
                    data-pencil-name="Title Row"
                    className="box-border w-fit h-fit shrink-0 flex flex-row gap-[6px] justify-start items-center"
                  >
                    <div
                      data-pencil-name="Arrow"
                      className="text-[16px]/[normal] box-border text-[#B0271A] font-[Inter,system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                    >
                      ▼
                    </div>
                    <div
                      data-pencil-name="Name"
                      className="text-[22px]/[normal] box-border text-[#2C2C2C] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold tracking-[0.2px] text-left [white-space:nowrap]"
                    >
                      {state[1].DistrictName}
                    </div>
                  </div>
                  <div
                    data-pencil-name="Bullets"
                    className="text-[15px]/[26px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    • મૂડીખર્ચ 41.7%, કૃષિ 32% ખાધ
                    <br />
                    • 32 પ્રોજેક્ટ બાકી, 8 ટેન્ડર રદ
                    <br />
                    • PM-AWAS 1,847 લાભાર્થી
                  </div>
                </div>


                <div
                  data-pencil-name="District ડાંગ"
                  className="box-border w-full h-fit shrink-0 flex flex-col gap-[3px] p-[6px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Top Rule"
                    className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                  ></div>
                  <div
                    data-pencil-name="Title Row"
                    className="box-border w-fit h-fit shrink-0 flex flex-row gap-[6px] justify-start items-center"
                  >
                    <div
                      data-pencil-name="Arrow"
                      className="text-[16px]/[normal] box-border text-[#B0271A] font-[Inter,system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                    >
                      ▼
                    </div>
                    <div
                      data-pencil-name="Name"
                      className="text-[22px]/[normal] box-border text-[#2C2C2C] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold tracking-[0.2px] text-left [white-space:nowrap]"
                    >
                      {state[1].DistrictName}
                    </div>
                  </div>
                  <div
                    data-pencil-name="Bullets"
                    className="text-[15px]/[26px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    • મૂડીખર્ચ 41.7%, કૃષિ 32% ખાધ
                    <br />
                    • 32 પ્રોજેક્ટ બાકી, 8 ટેન્ડર રદ
                    <br />
                    • PM-AWAS 1,847 લાભાર્થી
                  </div>
                </div>
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
                  className="box-border w-full h-fit shrink-0 flex flex-row gap-[5px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Number"
                    className="text-[76px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium tracking-[-2px] text-left [white-space:nowrap]"
                  >
                    94.2%
                  </div>
                  <div
                    data-pencil-name="Trend"
                    className="text-[34px]/[normal] box-border text-[#E67E22] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                  >
                    ▲
                  </div>
                </div>
                <div
                  data-pencil-name="Description"
                  className="text-[19px]/[normal] box-border text-[#2C2C2C] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
                >
                  મૂડીખર્ચ સિદ્ધિ
                </div>
                <div
                  data-pencil-name="Comparison"
                  className="text-[16px]/[normal] box-border text-[#8A8A8A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left [white-space:nowrap]"
                >
                  લક્ષ્યાંક 87.4% સામે · Q1 FY 2026-27
                </div>
                <div
                  data-pencil-name="Divider"
                  className="box-border w-full h-[1px] shrink-0 bg-[#DADADA]"
                ></div>
                <div
                  data-pencil-name="Micro Row"
                  className="box-border w-full h-fit shrink-0 flex flex-row gap-[8px] p-[6px_0px_0px_0px] justify-between items-start"
                >
                  <div
                    data-pencil-name="M1"
                    className="text-[13px]/[normal] box-border text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                  >
                    ₹18,427 કરોડ
                  </div>
                  <div
                    data-pencil-name="M2"
                    className="text-[13px]/[normal] box-border text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                  >
                    412 પ્રોજેક્ટ
                  </div>
                  <div
                    data-pencil-name="M3"
                    className="text-[13px]/[normal] box-border text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                  >
                    33 જિલ્લા
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
              <div
                data-pencil-name="Title"
                className="text-[28px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
              >
                સ્માર્ટ મોબિલિટી ફેઝ II શરૂ
              </div>
              <div
                data-pencil-name="Stories Row"
                className="box-border w-full [flex:1_1_0] flex flex-row gap-[24px] justify-start items-start"
              >
                <div
                  data-pencil-name="Story AMRUT 2.0"
                  className="box-border w-[229px] shrink-0 h-[293px] flex flex-col gap-[6px] p-[8px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Title"
                    className="text-[20px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
                  >
                    ▸ AMRUT 2.0
                  </div>
                  <div
                    data-pencil-name="Body"
                    className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    ₹2,140 Cr ફાળવણી 84 km ટ્રાન્ઝિટ કોરિડોર માટે મંજૂર. પ્રોજેક્ટ 18 મહિનામાં પૂર્ણ,
                    વર્લ્ડ બેંક સહ-ધિરાણ. AMC ભૂમિ સંપાદન શરૂ. 12 બસ સ્ટોપ, 4 ફૂટ ઓવરબ્રિજ, 3
                    ઇન્ટરચેન્જ.
                  </div>
                </div>
                <div
                  data-pencil-name="Story મેટ્રો ફેઝ-2"
                  className="box-border w-[229px] shrink-0 h-[293px] flex flex-col gap-[6px] p-[8px_0px] justify-start items-start"
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
                </div>
                <div
                  data-pencil-name="Story EV ઈન્ફ્રાસ્ટ્રક્ચર"
                  className="box-border w-[229px] shrink-0 h-[293px] flex flex-col gap-[6px] p-[8px_0px] justify-start items-start"
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
                </div>
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
            className="box-border w-[794px] h-[1123px] absolute left-[874px] top-0 flex flex-col gap-[3px] p-[30px] justify-start items-start bg-[#FBF9F4] overflow-hidden"
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
                    <div
                      data-pencil-name="Subtitle"
                      className="text-[14px]/[21px] box-border text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left [white-space:nowrap]"
                    >
                      Q1 FY ૨૦૨૬-૨૭ · ૨૨ વિભાગોમાંથી ૮ ધ્યાન આપવાલાયક
                    </div>
                  </div>
                  <div
                    data-pencil-name="Dept શહેરી વિકાસ વિભાગ"
                    className="box-border w-full h-fit shrink-0 flex flex-col gap-[1px] p-[3px_0px] justify-start items-start"
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
                        className="text-[17px]/[normal] box-border text-[#B0271A] font-[Inter,system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                      >
                        ▼
                      </div>
                      <div
                        data-pencil-name="Name"
                        className="text-[18px]/[normal] box-border text-[#2C2C2C] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
                      >
                        શહેરી વિકાસ વિભાગ
                      </div>
                    </div>
                    <div
                      data-pencil-name="Bullets"
                      className="text-[16px]/[25px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                    >
                      • મૂડીખર્ચ 41.2%; 84 ટેન્ડર બાકી
                      <br />
                      • સ્માર્ટ સિટીમાં 31 દિવસ વિલંબ
                    </div>
                  </div>
                  <div
                    data-pencil-name="Dept ઉચ્ય શિક્ષણ વિભાગ"
                    className="box-border w-full h-fit shrink-0 flex flex-col gap-[1px] p-[3px_0px] justify-start items-start"
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
                        className="text-[17px]/[normal] box-border text-[#B0271A] font-[Inter,system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                      >
                        ▼
                      </div>
                      <div
                        data-pencil-name="Name"
                        className="text-[18px]/[normal] box-border text-[#2C2C2C] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
                      >
                        ઉચ્ય શિક્ષણ વિભાગ
                      </div>
                    </div>
                    <div
                      data-pencil-name="Bullets"
                      className="text-[16px]/[25px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                    >
                      • મૂડીખર્ચ 47.8%; ₹126 Cr પેન્ડિંગ
                      <br />
                      • 18 યુનિવર્સિટીમાં 22 દિવસ વિલંબ
                    </div>
                  </div>
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
                    <div
                      data-pencil-name="Title"
                      className="text-[24px]/[normal] box-border text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium text-left [white-space:nowrap]"
                    >
                      આયુષ્માન ભારત: 2.14 Cr લાભાર્થી
                    </div>
                  </div>
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
                      className="text-[18px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
                    >
                      ▸ OPD ડિજિટલાઈઝેશન
                    </div>
                    <div
                      data-pencil-name="Body"
                      className="text-[16px]/[26px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                    >
                      1,847 PHC પેપરલેસ. સરેરાશ સમય 12 થી 6 મિનિટ. રાષ્ટ્રીય ક્રમાંક 2.
                    </div>
                  </div>
                  <div
                    data-pencil-name="Story માતૃ મૃત્યુદરમાં ઘટાડો"
                    className="box-border w-full [flex:1_1_0] flex flex-col gap-[2px] p-[4px_0px] justify-start items-start"
                  >
                    <div
                      data-pencil-name="Top Rule"
                      className="box-border w-full h-[0.5px] shrink-0 bg-[#DADADA]"
                    ></div>
                    <div
                      data-pencil-name="Title"
                      className="text-[18px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
                    >
                      ▸ માતૃ મૃત્યુદરમાં ઘટાડો
                    </div>
                    <div
                      data-pencil-name="Body"
                      className="text-[16px]/[26px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                    >
                      MMR 78 થી ઘટીને 68. SDG-2030 લક્ષ્યાંક 8 વર્ષ અગાઉ પ્રાપ્ત.
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-pencil-name="Negative News Highlights"
                className="box-border [flex:1_1_0] h-full relative"
              >
                <div
                  data-pencil-name="NegHeader"
                  className="box-border w-[378px] h-fit absolute left-0 top-0 flex flex-row gap-[12px] p-[0px_0px_12px_0px] justify-start items-center [z-index:0]"
                >
                  <div
                    data-pencil-name="Label"
                    className="text-[15px]/[normal] box-border text-[#B0271A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                  >
                    નકારાત્મક અહેવાલ
                  </div>
                  <div
                    data-pencil-name="Spacer"
                    className="box-border [flex:1_1_0] h-[1px] flex flex-row gap-0 justify-start items-start"
                  ></div>
                  <div
                    data-pencil-name="Page Tag"
                    className="text-[11px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left [white-space:nowrap]"
                  >
                    પૃષ્ઠ ૦૨ · આગળ પૃષ્ઠ ૦૩
                  </div>
                </div>
                <div
                  data-pencil-name="Header Rule"
                  className="box-border w-[378px] h-[3px] absolute left-0 top-[22px] bg-[#B0271A] [z-index:1]"
                ></div>
                <div
                  data-pencil-name="FeatureBody"
                  className="box-border w-[378px] h-[317.5px] absolute left-0 top-[35px] flex flex-row gap-[20px] justify-start items-start [z-index:2]"
                >
                  <div
                    data-pencil-name="Lead Column"
                    className="box-border w-[240px] shrink-0 h-full flex flex-col gap-[8px] justify-start items-start"
                  >
                    <div
                      data-pencil-name="Kicker"
                      className="text-[13px]/[normal] box-border text-[#5A5A5A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-semibold tracking-[0.1px] text-left [white-space:nowrap]"
                    >
                      ફિસ્કલ · ચોમાસુ · પાક વીમો
                    </div>
                    <div
                      data-pencil-name="Headline"
                      className="text-[30px]/[34px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-medium tracking-[-0.3px] text-left"
                    >
                      ત્રણ જિલ્લામાં 19 મહિનાથી ₹1,284 Cr પૂર-વળતર પેન્ડિંગ
                    </div>
                    <div
                      data-pencil-name="Byline"
                      className="text-[12px]/[normal] box-border text-[#8A8A8A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.1px] text-left [white-space:nowrap]"
                    >
                      સંપાદકીય ડેસ્ક · ૦૩ જુલાઈ ૨૦૨૬ · ૦૬:૪૨ IST
                    </div>
                    <div
                      data-pencil-name="Body"
                      className="text-[15px]/[25px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                    >
                      આણંદ, ખેડા અને પંચમહલ જિલ્લામાં 2.3 લાખ ખેડૂતોના પાક વીમા દાવા 19 મહિનાથી અટવાયેલા
                      છે. 412 કિમી ગ્રામીણ માર્ગ સમારકામ હજુ બાકી.
                    </div>
                  </div>
                  <div
                    data-pencil-name="Side Column"
                    className="box-border [flex:1_1_0] h-full flex flex-col gap-[6px] justify-start items-start"
                  >
                    <div
                      data-pencil-name="Stats Frame"
                      className="box-border w-full h-fit shrink-0 flex flex-col gap-[5px] justify-start items-start"
                    >
                      <div
                        data-pencil-name="Stats Label"
                        className="text-[13px]/[normal] box-border text-[#2C2C2C] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                      >
                        આંકડાકીય વિગત
                      </div>
                      <div
                        data-pencil-name="Stats Rule"
                        className="box-border w-[87px] h-[2px] shrink-0 bg-[#2C2C2C]"
                      ></div>
                      <div
                        data-pencil-name="Stat સરેરાશ દાવો પેન્ડિંગ"
                        className="box-border w-full h-fit shrink-0 flex flex-row gap-[6px] p-[2px_0px] justify-start items-center"
                      >
                        <div
                          data-pencil-name="Number"
                          className="text-[24px]/[normal] box-border text-[#B0271A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                        >
                          ૧૯
                        </div>
                        <div
                          data-pencil-name="Unit"
                          className="text-[10px]/[normal] box-border text-[#5A5A5A] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-normal tracking-[0.6px] text-left [white-space:nowrap]"
                        >
                          મહિના
                        </div>
                        <div
                          data-pencil-name="Label"
                          className="text-[11px]/[14px] box-border [flex:1_1_0] text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                        >
                          સરેરાશ પેન્ડિંગ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  data-pencil-name="Related Section"
                  className="box-border w-[378px] h-[317.5px] absolute left-0 top-[352.5px] flex flex-col gap-[6px] p-[12px_0px_0px_0px] justify-start items-start [z-index:3]"
                >
                  <div
                    data-pencil-name="Divider"
                    className="box-border w-full h-[0.8px] shrink-0 bg-[#2C2C2C]"
                  ></div>
                  <div
                    data-pencil-name="Related Label"
                    className="text-[12px]/[normal] box-border text-[#2C2C2C] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                  >
                    સંબંધિત · સંક્ષેપમાં
                  </div>
                  <div
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
                  </div>
                </div>
              </div>
            </div>
            <div
              data-pencil-name="Positive News Highlights"
              className="box-border w-full h-[330px] shrink-0 flex flex-col gap-0 justify-start items-start"
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
                      className="text-[24px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                    >
                      ૦૧
                    </div>
                    <div
                      data-pencil-name="Tag"
                      className="text-[11px]/[normal] box-border text-[#2C2C2C] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                    >
                      માળખાગત
                    </div>
                  </div>
                  <div
                    data-pencil-name="Title"
                    className="text-[20px]/[24px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left"
                  >
                    સરદાર સરોવર 92% ક્ષમતાએ
                  </div>
                  <div
                    data-pencil-name="Body"
                    className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    4.2 લાખ હેક્ટરમાં અગાઉથી ખરીફ વાવણી શરૂ. 147 ગામડાઓને નિયમિત સિંચાઈ મળી રહી છે.
                    જળાશયમાં 334 મીટર જળસ્તર જળવાઈ રહ્યું.
                  </div>
                </div>
                <div
                  data-pencil-name="Pos રોજગાર"
                  className="box-border [flex:1_1_0] h-fit flex flex-col gap-[8px] p-[14px_0px_0px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Top Row"
                    className="box-border w-fit h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center"
                  >
                    <div
                      data-pencil-name="Number"
                      className="text-[24px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                    >
                      ૦૨
                    </div>
                    <div
                      data-pencil-name="Tag"
                      className="text-[11px]/[normal] box-border text-[#2C2C2C] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                    >
                      રોજગાર
                    </div>
                  </div>
                  <div
                    data-pencil-name="Title"
                    className="text-[20px]/[24px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left"
                  >
                    iCreate કૌશલ્ય કેન્દ્રો
                  </div>
                  <div
                    data-pencil-name="Body"
                    className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    18,400 યુવાનોને રોજગારી; સરેરાશ ₹3.2 LPA પગાર. 41% પ્રથમ પેઢીના નોકરિયાત અને 38%
                    મહિલા લાભાર્થી.
                  </div>
                </div>
                <div
                  data-pencil-name="Pos કૃષિ"
                  className="box-border [flex:1_1_0] h-fit flex flex-col gap-[8px] p-[14px_0px_0px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Top Row"
                    className="box-border w-fit h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center"
                  >
                    <div
                      data-pencil-name="Number"
                      className="text-[24px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                    >
                      ૦૩
                    </div>
                    <div
                      data-pencil-name="Tag"
                      className="text-[11px]/[normal] box-border text-[#2C2C2C] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                    >
                      કૃષિ
                    </div>
                  </div>
                  <div
                    data-pencil-name="Title"
                    className="text-[20px]/[24px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left"
                  >
                    ખરીફ વાવણી 84 લાખ હેક્ટરને પાર
                  </div>
                  <div
                    data-pencil-name="Body"
                    className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    84 લાખ હેક્ટરમાં વાવણી; ગત વર્ષ કરતાં 11% વધુ. ₹12,400 કરોડ સબસિડી વિતરણ થઈ ચૂક્યું.
                  </div>
                </div>
                <div
                  data-pencil-name="Pos શાસન"
                  className="box-border [flex:1_1_0] h-fit flex flex-col gap-[8px] p-[14px_0px_0px_0px] justify-start items-start"
                >
                  <div
                    data-pencil-name="Top Row"
                    className="box-border w-fit h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center"
                  >
                    <div
                      data-pencil-name="Number"
                      className="text-[24px]/[normal] box-border text-[#E67E22] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
                    >
                      ૦૪
                    </div>
                    <div
                      data-pencil-name="Tag"
                      className="text-[11px]/[normal] box-border text-[#2C2C2C] font-['Noto_Sans_Gujarati',system-ui,sans-serif] font-bold tracking-[0.1px] text-left [white-space:nowrap]"
                    >
                      શાસન
                    </div>
                  </div>
                  <div
                    data-pencil-name="Title"
                    className="text-[20px]/[24px] box-border w-full text-[#163B7A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-semibold text-left"
                  >
                    રૂરબન મિશન 187 ક્લસ્ટર
                  </div>
                  <div
                    data-pencil-name="Body"
                    className="text-[14px]/[22px] box-border w-full text-[#5A5A5A] font-['Noto_Serif_Gujarati',system-ui,sans-serif] font-normal text-left"
                  >
                    22 લાખ ગ્રામીણ રહેવાસીઓને સ્વચ્છ પાણીની સુવિધા. 2,347 કિમી નવા ગ્રામીણ માર્ગો
                    બંધાયા.
                  </div>
                </div>
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