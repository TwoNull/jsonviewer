import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { GoNoEntry, GoQuestion } from "react-icons/go";
import { VscJson, VscSymbolArray, VscSymbolBoolean, VscSymbolKey, VscSymbolNumeric } from "react-icons/vsc";


const itemClasses = {
    title: "text-xs"
}

export default function Viewer(props: {object: any}) {
    function renderAccordion(data: any) {
        return Object.entries(data).map(([key, value]) => {
            switch(typeof value) {
                case "object":
                    const objectType = Object.prototype.toString.call(value)
                    if (objectType === '[object Null]') {
                        return <span className="flex items-center gap-1 text-xs"><GoNoEntry />{key + ":"}<span>null</span></span>
                    }
                    if (objectType === '[object Undefined]') {
                        return <span className="flex items-center gap-1 text-xs"><GoQuestion />{key + ":"}<span>undefined</span></span>
                    }
                    if (objectType === '[object Object]') {
                        return (
                            <Accordion itemClasses={itemClasses} isCompact>
                                <AccordionItem key={key} title={key} startContent={<VscJson />}>
                                    <div className="flex flex-row gap-2">
                                        <div className="border-[0.5px] border-neutral-400"/>
                                        <div>
                                            {renderAccordion(value)}
                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        )
                    }
                    if (objectType === '[object Array]') {
                        return (
                            <Accordion itemClasses={itemClasses} isCompact>
                                <AccordionItem key={key} title={key} startContent={<VscSymbolArray />}>
                                    <div className="flex flex-row gap-2">
                                        <div className="border-[0.5px] border-neutral-400"/>
                                        <div>
                                            {renderAccordion(value)}
                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        )
                    }
                case "number":
                    return <span className="flex items-center gap-1 text-xs"><VscSymbolNumeric />{key + ": " + String(value)}</span>
                case "string":
                    return <span className="flex items-center gap-1 text-xs"><VscSymbolKey />{key + ": " + String(value)}</span>
                case "boolean":
                    return <span className="flex items-center gap-1 text-xs"><VscSymbolBoolean />{key + ": " + String(value)}</span>
                default:
                    return <span className="text-xs">{key + ": " + String(value)}</span>
            }
        });
    }

    return (
        <Card>
            <CardBody className="font-mono">
                {renderAccordion(props.object)}
            </CardBody>
        </Card>  
    )
}