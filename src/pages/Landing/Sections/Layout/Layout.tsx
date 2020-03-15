import React,{FunctionComponent} from 'react'
import {Row, Col} from 'antd'

interface Props{
    title: string, 
    description: string,
    id?:string
}

//Single section
const Section: FunctionComponent<Props>= ({children, title, description, id}) => {
    return (
        <Row justify='space-between' className="Section" id={id}>
            <Col lg={5} className="Section-Header">
                <h2>{title}</h2>
                <p>{description}</p>
            </Col>

            <Col span="18" className="Section-Content">
                <Row justify='space-around' align='middle' className="Section-Children">
                    {children}
                </Row>
            </Col>
        </Row>
    )
}

export default Section
