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
    overview: `Interested in the intersection of design and software, especially software tools and (visual) programming langauges.`,
    experience: [
        {
            title: 'Design Tools — Human Interface',
            company: `Apple Inc`,
            description: [
                `Primary maintainer of Apple's most important proprietary UI design app. Work closely with the UI prototyping team to address short and long-term development and maintenance.` +
                `` +
                `\n\nCreated a JS-to-native bridge with advanced (dangerous) features, such as subclassing Obj-C classes from JavaScript, passing JavaScript variables to Obj-C in-out arguments, and more. Supports indexing of system APIs in the style of \`BridgeSupport\`` +
                `\n\nCreated a prototype visual programming language. Nodes in the language can be implemented in Swift and they are recompiled live. `
            ],
            when: `2012 Apr — Now`
        },
        {
            title: `Design and Technology`,
            company: `Seesaw Psychology Group`,
            description: `Co-founder. Responsibilities include: website, interior design, databases, back office, and more`,
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
            title: 'Designer and iOS developer', company: `Spot Inc`,
            description: [
                `Design and implementation of _Spot_, a location wishlisting app a highly visual and compelling user experience.`
            ],
            when:`2010 Aug — 2011 Dec`
        },
        {
            title: 'Staff Engineer', company: `Sun Microsystems`,
            description: `Worked on a visual programming environment for JavaFX`
        },
        { title: 'Independent Software Developer' },
        {
            title: 'Bicycle Tour!',
            description: `Saw Denmark, Germany, Holland, Belgium, Luxembourg, Switzerland, Italy`
        },
        {
            title: 'Senior Scientist/Engineer', company: `Apple Inc`,
            description: [
                `FireWire drivers`,
                ``
            ]
        },
        { title: 'Assistant Engineer', hidden: true },
        { title: 'Student (Mandarin)', hidden: true },
    ]
}

const Paragraphs = ({ id = '', strings }: { id?:string, strings: ParagraphData }) => {
    const stringsArray = Array.isArray(strings) ? strings : [strings];
    return <div id={id}>{stringsArray.map((desc, index) => <ReactMarkdown key={index.toString()} source={desc} />)}</div>
}

// the page
export default () => <div>
    <Helmet>
        <title>Niels Gabel — Résumé</title>
    </Helmet>
    <header>
        <h1 className='display-head'>Niels Gabel</h1>
        <Paragraphs id='overview' strings={nielsgabel.overview} />
        {/* <Heading /> */}
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
                            {item.company ? <div className='company-name'>{item.company}</div> : null}
                            {item.when ? <div className='when'>{item.when}</div> : null}
                        </div>
                        {item.description ? <Paragraphs strings={item.description} /> : null}
                    </li>
                }) ?? null
            }</ul>
        </div>
    </main>
</div>
