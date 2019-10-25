import React, { ReactFragment } from "react"
import Heading from '../components/heading'
import '../components/site.scss'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'

// Poor man's CMS:
type ParagraphData = string | string[]
interface ResumeDataItem {
    title: string
    company?: string
    when?: string
    description?: ParagraphData
    hidden?: boolean
}
interface ResumeData {
    overview: ParagraphData
    experience: ResumeDataItem[]
}

const nielsgabel: ResumeData = {
    overview: `Design + code.\n\nCurrently focused on design tools and (visual) programming languages.`,
    experience: [
        {
            title: 'Design Tools — Human Interface',
            company: `Apple Inc`,
            description: [
                `Lead programmer on Apple's primary UI design tool` +
                `\n\nCreated a full-featured JS-to-native library similar to [PyObjC](https://pypi.org/project/pyobjc/). Includes subclassing Obj-C from JavaScript, support for Obj-C in-out arguments, and more.` +
                `\n\nCreated a prototype visual programming language. Nodes can be created using Swift directly in the editor.`
            ],
            when: `2012 Apr — Now`
        },
        {
            title: `Design and Technology`,
            company: `Seesaw Psychology Group`,
            description: `Co-founder. Responsibilities include: website, [interior design](https://www.icloud.com/sharedalbum/#B1aJ5HumnJJshVM), databases, back office, and more.`,
            when: `2010 Aug — Now`
        },
        {
            title: 'Lead iOS Developer',
            company: `Doubledutch Inc`,
            description: [
                `Design and implementation of enterprise iOS apps. Designed a built a news app (think Apple News) for Cisco's sales team.`
            ],
            when: `2011 Dec — 2012 Apr`
        },
        {
            title: 'Designer and iOS developer',
            company: `Spot Inc`,
            description: [
                `Design and implementation of _Spot_, a location wishlisting app a highly visual and compelling user experience.`
            ],
            when: `2010 Aug — 2011 Dec`
        },
        {
            title: 'Staff Engineer',
            company: `Sun Microsystems`,
            description: `Worked on a visual programming environment for JavaFX`,
            when: `2008 Nov — 2010 Jul`
        },
        {
            title: 'Independent Software Developer',
            description: [
                `IOS App consulting, design and programming.`,
                `Co-founded HoodHot. We designed and built Tokyo Teleport, an iOS travel guide that incorporated professionally produced video segments, offline maps, and more.`
            ],
            when: `2007 Oct — 2008 Sep`
        },
        {
            title: 'Bicycle Tour!',
            description: `Denmark, Germany, Holland, Belgium, Luxembourg, Switzerland, Italy`,
            when: `2007 Aug — 2007 Oct`
        },
        {
            title: 'Senior Scientist/Engineer — Core OS',
            company: `Apple Inc`,
            description: [
                `Wrote and maintained the FireWire user client. FireWire I/O Kit driver developer. Learned a lot about professional software development and multithreaded and asynchronous software.`
            ],
            when: `1999 Oct — 2007 Jul`
        },
        { title: 'Assistant Engineer', when: `1998 Oct — 1999 Oct`, hidden: true },
        { title: 'Student (Mandarin)', when: `1998 May`, hidden: true },
        { title: 'B. Sc. Computer Engineering', when: `1998 May`, hidden: true },
    ]
}

const Paragraphs = ({ id = '', strings }: { id?: string, strings: ParagraphData }) => {
    const stringsArray = Array.isArray(strings) ? strings : [strings];
    return <div id={id}>{stringsArray.map((desc, index) => <ReactMarkdown key={index.toString()} source={desc} />)}</div>
}

// the page
export default () => <div>
    <Helmet>
        <title>Niels Gabel — Résumé</title>
    </Helmet>
    <header>
        {/* <Heading /> */}
        <div id='name-head-container'>
            <h1 id='name-head' className='display-head'>Niels Gabel</h1>
            <div id='name-head-links-container'>
                <a href='https://github.com/nielsbot' className='subtle' style={{ marginLeft: 'auto' }}>GitHub</a>
                <a href='https://stackoverflow.com/users/210171/nielsbot' className='subtle'>Stack Overflow</a>
            </div>
        </div>
        <Paragraphs id='overview' strings={nielsgabel.overview} />
    </header>
    <main>
        <div id='content-container'>
            <ul id='experience'>{
                nielsgabel.experience?.map((item, index) => {
                    if (item.hidden ?? false) {
                        return null;
                    }

                    return <li className='experience-item' key={`item${index}`}>
                        <div className='title-container'>
                            <h3 className='title' >{item.title}</h3>
                            {item.company ? <ReactMarkdown className='company-name byline' source={item.company} /> : null}
                            {item.when ? <div className='when byline'>{item.when}</div> : null}
                        </div>
                        {item.description ? <Paragraphs strings={item.description} /> : null}
                    </li>
                }) ?? null
            }</ul>
            <hr />
            <div>
                <h3>Languages Supported</h3>
                <p>Swift, Objective-C/C, TypeScript, some Danish and Mandarin, and a little bit of French, Ruby, Java and more.</p>
            </div>
        </div>
    </main>
</div>
