"use client"

import JSON5 from 'json5'
import { VscJson } from "react-icons/vsc";
import { useState, Key } from "react";
import { Tabs, Tab, Card, CardBody, Input } from "@nextui-org/react";
import Viewer from "./components/viewer";

export default function Home() {
    const [selected, setSelected] = useState("text");
    const [data, setData] = useState("")
    const [obj, setObj] = useState({})

    async function changeSelection(key: Key) {
        if (key.toString() == "viewer") {
            try {
                const obj = await JSON5.parse(data)
                setObj(obj)
                setSelected("viewer")
            } catch (e: any) {
                alert(e)
            }
        } else {
            setSelected(key.toString())
        }
    }

    return (
        <main className="min-h-screen max-w-screen-xl p-16">
            <Tabs onSelectionChange={changeSelection} selectedKey={selected}>
                <Tab key="viewer" title="View">
                    <Viewer object={obj} />
                </Tab>
                <Tab key="text" title="Text">
                    <Card>
                        <CardBody>
                            <Input
                                label="JSON Object"
                                placeholder=""
                                value={data}
                                onValueChange={setData}
                            />
                        </CardBody>
                    </Card>  
                </Tab>
            </Tabs>
        </main>
    );
}
