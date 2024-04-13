"use client"

import JSON5 from 'json5'
import { useState, Key } from "react";
import { Tabs, Tab, Card, CardBody, Textarea } from "@nextui-org/react";
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
        <main className="min-h-screen mx-auto max-w-screen-xl p-8">
            <div>
                <Tabs onSelectionChange={changeSelection} selectedKey={selected}>
                    <Tab key="viewer" title="View">
                        <Viewer object={obj} />
                    </Tab>
                    <Tab key="text" title="Text">
                        <Card>
                            <CardBody>
                                <Textarea
                                    label="JSON Object"
                                    value={data}
                                    onValueChange={setData}
                                    fullWidth
                                    disableAutosize
                                    rows={20}
                                />
                            </CardBody>
                        </Card>  
                    </Tab>
                </Tabs>
            </div>
        </main>
    );
}
