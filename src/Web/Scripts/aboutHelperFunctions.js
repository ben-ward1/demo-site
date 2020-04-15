function BuildAboutTechInfoObject() {
  return [
    {
      title: "Front End & Website",
      items: [
        {
          title: "React.js",
          description:
            "I built out a react front-end using npm/webpack/babel and a few other things. Webpack " +
            "uses all files named app.jsx as entry points for the transpiler (babel). For the most part, each page " +
            "has its own app.dist.js distributable of the transpiled react code.",
        },
        {
          title: "ASP.NET site",
          description:
            "This is an ASP.NET MVC site targeting .NET Framework v4.6. The actual server code for the site " +
            "doesn't do much other than make calls to a separate API (mentioned below) and serve up the pages.",
        },
      ],
    },
    {
      title: "API",
      items: [
        {
          title: "ASP.NET Core API",
          description:
            "I stood up  an ASP.NET Core API (.NET Core 2.1) that will field requests from the website. Right now it's " +
            "serving simple GET/POSTs for the guestbook pages. I may consider looking into a free Twilio Sms trial to " +
            "show off a 3rd party integration, do something cool, idk.",
        },
        {
          title: "SQL Server Db",
          description:
            "The API has its own 2017 SQL Server Db, which is only storing guestbook entries at this point. The site has " +
            "no data store of it's own, but rather relies on the API for data persistence. The API uses Dapper ORM to " +
            "access the SQL data.",
        },
      ],
    },
    {
      title: "Host",
      items: [
        {
          title: "Internet Information Services (IIS)",
          description:
            "I am hosting all of this stuff on an IIS instance running on my local machine. Hosting the website is as simple as " +
            "pointing the default site in IIS to the site's project directory. For the API (.NET Core), I've found that " +
            "an additional publishing step is necessary for it to run on IIS correctly.",
        },
        {
          title: "ngrok",
          description:
            "I'm exposing the site running on IIS through ngrok, a cloud service that relays traffic to my local " +
            "web service. It's a pretty useful tool to use against locally developed projects for demoing, testing on multiple " +
            "devices, etc.",
        },
      ],
    },
  ];
}

module.exports = {
  BuildAboutTechInfoObject,
};
