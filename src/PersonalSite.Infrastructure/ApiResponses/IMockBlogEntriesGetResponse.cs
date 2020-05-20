using System.Collections.Generic;
using Newtonsoft.Json;


namespace Infrastructure.ApiResponses
{
    public class IMockBlogEntriesGetResponse : IHttpResponse
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }
    }

    public static class BlogMocker
    {
        public static IEnumerable<IMockBlogEntriesGetResponse> MockBlog()
        {
            return new IMockBlogEntriesGetResponse[]
            {
                new IMockBlogEntriesGetResponse()
                {
                    Title = "Professionally speaking,",
                    Content =
@"I created this site because writing a plain old resume is boring (but 
you can still see mine on the Contact page). I've been a full-stack 
software developer for about two years, so it's about time I got around 
to making a personal site. All of my professional work has been web dev 
stuff, including working on public-facing websites, writing/consuming 
REST Api's, page UI's, server code, data querying, etc. Building 
software and seeing it work is my passion. Writing code and creating a 
knockout solution to an obscure problem is my idea of a good time. See 
the About page for a list of some of the languages/tech that I work with."
                },
                new IMockBlogEntriesGetResponse()
                {
                    Title = "Let's get personal.",
                    Content =
@"Birmingham, Alabama has been my home once and then once again when I 
moved back here about a year ago. I've also lived in Huntsville working 
for the DoD, and before that I spent some time enlisted in the Army. Been 
some places, done some things. Riding my bike on the Lakeshore trail, playing in a 
pool league, and going to occasional rave concerts gets me out of 
the house. I'm casually interested in space and cosmology, spending 
the occasional weekend binging on PBS Space Time videos and Wikipedia 
rabbit holes. I try to take 1 - 2 trips per year, but COVID-19 postponed 
the vacation I booked to Denver. That's what I'm looking forward to the 
most when this whole thing ends."
                },
                new IMockBlogEntriesGetResponse()
                {
                    Title = "What's next?",
                    Content =
@"I really enjoy working on this site. It would be really cool to add some 
new functional domain that could make the site useful to visitors. If you 
have any ideas, don't hesitate to contact me. On the front end, there are 
some accessibility features that need to be addressed (need to make a few
things tabbable, for instance). If you come across an accessibility issue, 
please let me know so that I can address it."
                },
                new IMockBlogEntriesGetResponse()
                {
                    Title = "Do you need a great developer on your team?",
                    Content =
@"I know a guy. I've become recently unemployed due to COVID-19 and am 
looking for my next opportunity. Whether you need to hire for your company or 
are just looking for someone to create a website for your business, see my 
resume on the Contact page to get in touch with me. I'm based in Birmingham, 
AL, but am happy to discuss remote work or maybe even relocation. Let's talk 
about what I can do for you."
                }
            };
        }
    }
}
