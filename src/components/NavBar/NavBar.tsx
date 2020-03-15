import React from 'react'
import {Row, Col} from 'antd'

interface Props {
    
}

const NavBar = (props: Props) => {
    return (
        <Row justify='space-between' align='middle' className="NavBar">
            <Col lg={4}>
                <a href="/" className="logo">WEB CONSOLE</a>
            </Col>
            <Col lg={10} className="NavBar-NavLink">
                <a href="/">Overview</a>
                <a href="/">Docs</a>
                <a href="/">Tutorial</a>
                <a href="/">Sign out</a>
            </Col>
        </Row>
    )
}

export default React.memo(NavBar)
