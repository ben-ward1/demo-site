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
            "has its own app.dist.js distributable of the transpiled react code, making this a multi-page React front-end. " +
            "The pages were developed mobile-first with cross browser compatibility in mind. Take a look in a few different " +
            "browsers to see how I did.",
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
          title: "AWS EC2 Windows Server 2016",
          description:
            "I'm hosting the site and api on a cloud instance of Windows Server through IIS. Right now both the site and the api " +
            "are on the same box only because that's what I'm currently limited to by the AWS free tier. I plan to " +
            "migrate the api to a Linux box on Azure just to demonstrate .NET Core capabilities.",
        },
        {
          title: "AWS RDS",
          description:
            "The database is a standalone cloud instance of SQL Server 2017. Only the api communicates with the db. Right now it's " +
            "only storing data for the guestbook.",
        },
      ],
    },
  ];
}

module.exports = {
  BuildAboutTechInfoObject,
};
