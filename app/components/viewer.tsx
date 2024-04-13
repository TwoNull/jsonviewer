import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { GoNoEntry, GoQuestion } from "react-icons/go";
import { VscSymbolBoolean, VscSymbolKey, VscSymbolNumeric } from "react-icons/vsc";
import { ArrayIndicator, ObjectIndicator } from "./indicators";


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
                        return <span className="p-2 flex items-center gap-2 text-xs"><GoNoEntry className="text-default-400" size="16" />{key + ":"}<span>null</span></span>
                    }
                    if (objectType === '[object Undefined]') {
                        return <span className="p-2 flex items-center gap-2 text-xs"><GoQuestion className="text-default-400" size="16" />{key + ":"}<span>undefined</span></span>
                    }
                    if (objectType === '[object Object]') {
                        return (
                            <Accordion itemClasses={itemClasses} isCompact>
                                <AccordionItem key={key} title={key} classNames={{"trigger": "flex-row-reverse gap-2", "content": "p-0"}} indicator={({isOpen}) => <ObjectIndicator isOpen={isOpen} />} disableIndicatorAnimation>
                                    <div className="flex flex-row gap-2 px-[7px]">
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
                                <AccordionItem key={key} title={key} classNames={{"trigger": "flex-row-reverse gap-2", "content": "p-0"}} indicator={({isOpen}) => <ArrayIndicator isOpen={isOpen} />} disableIndicatorAnimation>
                                    <div className="flex flex-row gap-2 px-[7px]">
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
                    return <span className="p-2 flex items-center gap-2 text-xs"><VscSymbolNumeric className="text-default-400" size="16" />{key + ": " + String(value)}</span>
                case "string":
                    return <span className="p-2 flex items-center gap-2 text-xs"><VscSymbolKey className="text-default-400" size="16" />{key + ": " + String(value)}</span>
                case "boolean":
                    return <span className="p-2 flex items-center gap-2 text-xs"><VscSymbolBoolean className="text-default-400" size="16" />{key + ": " + String(value)}</span>
                default:
                    return <span className="p-2 text-xs">{key + ": " + String(value)}</span>
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