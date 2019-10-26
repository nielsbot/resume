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
    overview: `Design + code.\n\nCreative focus: Design tools and (visual) programming languages.`,
    experience: [
        {
            title: 'Design Tools — Human Interface',
            company: `Apple Inc`,
            description:
                `Lead programmer on Mica, Apple's primary UI prototyping tool, working directly with the UI prototyping team.` +
                `\n\nBuilt a full-featured JS-to-native library similar to [PyObjC](https://pypi.org/project/pyobjc/). Supports subclassing Obj-C from JavaScript, Obj-C/C in-out arguments, and more.` +
                `\n\nBuilt a prototype visual programming language. Supports live editing of Swift via dynamic recompile and reload.`,
            when: `2012 Apr — Now`
        },
        {
            title: `Design and Technology`,
            company: `Seesaw Psychology Group`,
            description: `Co-founder. Responsible for design ([interiors](https://www.icloud.com/sharedalbum/#B1aJ5HumnJJshVM), marketing collateral, and website), and internal apps, and more.`,
            when: `2010 Aug — Now`
        },
        {
            title: 'Lead iOS Developer',
            company: `Doubledutch Inc`,
            description: [
                `Design, implementation and maintenance of enterprise iOS apps. Designed and built a server-configurable iPad news reader for a large enterprise sales team.`
            ],
            when: `2011 Dec — 2012 Apr`
        },
        {
            title: 'Designer and iOS developer',
            company: `Spot Inc`,
            description: [
                `Designed and built Spot, a design-focused location wishlisting app with a polished and compelling user experience.`
            ],
            when: `2010 Aug — 2011 Dec`
        },
        {
            title: 'Staff Engineer',
            company: `Sun Microsystems`,
            description: `Helped create a visual programming environment for JavaFX`,
            when: `2008 Nov — 2010 Jul`
        },
        {
            title: 'Independent Software Developer',
            description: [
                `iOS App consulting, design and programming.`,
                `Co-founded HoodHot Inc. Designed and built Tokyo Teleport, an iOS travel guide to Tokyo. Really, a pocketable travel show incorporating professionally produced video segments, offline maps, and more.`
            ],
            when: `2007 Oct — 2008 Sep`
        },
        {
            title: 'Bicycle Tour!',
            description: `Denmark, Germany, Holland, Belgium, Luxembourg, Switzerland, Italy`,
            when: `2007 Aug — 2007 Oct`
        },
        {
            title: 'Senior Scientist/Engineer',
            company: `Apple Inc`,
            description: [
                `Built and maintained the FireWire user client. Helped develop the FireWire driver stack for OS X. Gained extensive experience with professional software development and multithreaded and asynchronous software.`
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

// the page renderer
export default () => <div>
    <Helmet>
        <title>Niels Gabel — Résumé</title>
    </Helmet>
    <header>
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
    <footer>
        <div className='print-only'>
            <div id='site-link'>nielsgabel.com</div>
        </div>
    </footer>
</div>
