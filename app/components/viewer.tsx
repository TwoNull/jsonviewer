import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { VscQuestion, VscSymbolBoolean, VscSymbolKey, VscSymbolNumeric, VscWarning } from "react-icons/vsc";
import { ArrayIndicator, ObjectIndicator } from "./indicators";


const itemClasses = {
    title: "text-xxs"
}

export default function Viewer(props: {object: any}) {
    function renderAccordion(data: any) {
        return Object.entries(data).map(([key, value]) => {
            switch(typeof value) {
                case "object":
                    const objectType = Object.prototype.toString.call(value)
                    if (objectType === '[object Null]') {
                        return <span className="p-1 flex items-center gap-1 text-xs"><VscWarning className="text-default-400" size="16" />{key + " : "}<span>null</span></span>
                    }
                    if (objectType === '[object Undefined]') {
                        return <span className="p-1 flex items-center gap-1 text-xs"><VscQuestion className="text-default-400" size="16" />{key + " : "}<span>undefined</span></span>
                    }
                    if (objectType === '[object Object]') {
                        return (
                            <Accordion itemClasses={itemClasses} isCompact>
                                <AccordionItem key={key} title={key} classNames={{"trigger": "flex-row-reverse gap-1 p-0", "content": "p-0"}} indicator={({isOpen}) => <ObjectIndicator isOpen={isOpen} />} disableIndicatorAnimation>
                                    <div className="flex flex-row gap-1 px-2">
                                        <div className="border-[0.5px] border-default-400"/>
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
                                <AccordionItem key={key} title={key} classNames={{"trigger": "flex-row-reverse gap-1 p-0", "content": "p-0"}} indicator={({isOpen}) => <ArrayIndicator isOpen={isOpen} />} disableIndicatorAnimation>
                                    <div className="flex flex-row gap-1 px-2">
                                        <div className="border-[0.5px] border-default-400"/>
                                        <div>
                                            {renderAccordion(value)}
                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        )
                    }
                case "number":
                    return (
                        <span className="px-2 flex items-center gap-1 text-medium text-xxs">
                            <VscSymbolNumeric className="text-red-600" size="16" />
                            <span>{key}</span>
                            <span className="text-default-400">{" : "}</span>
                            <span>{String(value)}</span>
                        </span>
                    )
                case "string":
                    return (
                        <span className="px-2 flex items-center gap-1 text-medium text-xxs">
                            <VscSymbolKey className="text-green-600" size="16" />
                            <span>{key}</span>
                            <span className="text-default-400">{" : "}</span>
                            <span>{"\"" + String(value) + "\""}</span>
                        </span>
                    )
                case "boolean":
                    return (
                        <span className="px-2 flex items-center gap-1 text-medium text-xxs">
                            <VscSymbolBoolean className="text-purple-600" size="16" />
                            <span>{key}</span>
                            <span className="text-default-400">{" : "}</span>
                            <span>{String(value)}</span>
                        </span>
                    )
                default:
                    return (
                        <span className="px-2 flex items-center gap-1 text-medium text-xxs">
                            <span>{key}</span>
                            <span className="text-default-400">{" : "}</span>
                            <span>{String(value)}</span>
                        </span>
                    )
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