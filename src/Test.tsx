export default function Test() {
  const kpis = [
    {
      title: "Population Covered",
      value: "12.4M",
      change: "+12%",
    },
    {
      title: "Schools",
      value: "18,420",
      change: "+5%",
    },
    {
      title: "Hospitals",
      value: "2,831",
      change: "+2%",
    },
    {
      title: "Villages",
      value: "18,736",
      change: "+1%",
    },
    {
      title: "Pending Cases",
      value: "321",
      change: "-18%",
    },
    {
      title: "Departments",
      value: "46",
      change: "+3%",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100 p-10">
      <div className="mx-auto max-w-7xl border-4 border-black bg-white shadow-2xl">

        {/* Newspaper Header */}

        <div className="border-b-4 border-black py-8 text-center">

          <h1 className="text-6xl font-black tracking-widest uppercase">
            The Performance Times
          </h1>

          <p className="mt-3 text-sm tracking-[8px] uppercase">
            Friday • July 10 • 2026 • Morning Edition
          </p>

        </div>

        {/* Headline */}

        <div className="border-b-2 border-black p-8">

          <div className="text-xs uppercase tracking-[5px]">
            Front Page
          </div>

          <h2 className="mt-3 text-5xl font-black leading-tight">
            Gujarat Achieves Highest Performance This Quarter
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-700">
            Overall state indicators improved across education,
            health, rural development, agriculture and public
            services according to today's consolidated report.
          </p>

        </div>

        {/* Hero KPI */}

        <div className="border-b-2 border-black py-14 text-center">

          <div className="uppercase tracking-[6px] text-gray-600">
            Overall Performance Index
          </div>

          <div className="mt-5 text-8xl font-black">
            94.82%
          </div>

          <div className="mt-4 text-2xl">
            ▲ +4.28% Since Yesterday
          </div>

        </div>

        {/* KPI Strip */}

        <div className="grid grid-cols-2 border-b-2 border-black md:grid-cols-3 lg:grid-cols-6">

          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="border-r border-b border-black p-5 last:border-r-0"
            >
              <div className="text-xs uppercase tracking-widest text-gray-500">
                {kpi.title}
              </div>

              <div className="mt-3 text-4xl font-black">
                {kpi.value}
              </div>

              <div className="mt-2 text-green-700 font-semibold">
                {kpi.change}
              </div>
            </div>
          ))}

        </div>

        {/* Newspaper Columns */}

        <div className="grid lg:grid-cols-3">

          {/* Left */}

          <div className="border-r-2 border-black p-8">

            <h3 className="border-b border-black pb-3 text-3xl font-black uppercase">
              Highlights
            </h3>

            <ul className="mt-6 space-y-5 text-lg leading-8">
              <li>
                • Ahmedabad records highest education growth.
              </li>

              <li>
                • Health department reaches record vaccination.
              </li>

              <li>
                • Rural infrastructure improves by 8%.
              </li>

              <li>
                • Water availability crosses seasonal average.
              </li>

              <li>
                • Agriculture output exceeds forecast.
              </li>
            </ul>

          </div>

          {/* Middle */}

          <div className="border-r-2 border-black p-8">

            <h3 className="border-b border-black pb-3 text-3xl font-black uppercase">
              Top Districts
            </h3>

            <div className="mt-8 space-y-6">

              {[
                "Ahmedabad",
                "Surat",
                "Rajkot",
                "Vadodara",
                "Bhavnagar",
              ].map((d, i) => (
                <div key={d}>

                  <div className="flex justify-between">

                    <span className="font-semibold">
                      {d}
                    </span>

                    <span>{98 - i}%</span>

                  </div>

                  <div className="mt-2 h-3 bg-gray-200">

                    <div
                      className="h-3 bg-black"
                      style={{
                        width: `${98 - i}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Right */}

          <div className="p-8">

            <h3 className="border-b border-black pb-3 text-3xl font-black uppercase">
              Editorial
            </h3>

            <p className="mt-6 text-lg leading-9 text-gray-700">

              Strong improvements across healthcare,
              education and public infrastructure indicate
              sustained administrative efficiency. Continued
              investment in district-level governance remains
              the primary recommendation for maintaining
              long-term growth.

            </p>

            <div className="mt-10 border-t-2 border-black pt-5">

              <div className="text-xs uppercase tracking-[5px]">
                Quote of the Day
              </div>

              <p className="mt-4 text-2xl italic">

                "Good governance is measured by people's
                lives, not statistics."

              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}