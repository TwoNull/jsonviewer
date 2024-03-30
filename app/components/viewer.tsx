import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";

const itemClasses = {
    title: "text-xs"
}

export default function Viewer(props: {object: any}) {

    function renderAccordion(data: any) {
        return Object.entries(data).map(([key, value]) => {
            switch(typeof value) {
                case "object":
                    return (
                        <Accordion className="" itemClasses={itemClasses} isCompact>
                            <AccordionItem key={key} title={key}>
                                <div className="flex flex-row gap-2">
                                    <div className="border-[0.5px] border-neutral-400"/>
                                    {renderAccordion(value)}
                                </div>
                            </AccordionItem>
                        </Accordion>
                    )
                default:
                    return <span className="text-xs">{key + ": " + String(value)}</span>
            }
        });
    }

    return (
        <Card>
            <CardBody>
                {renderAccordion(props.object)}
            </CardBody>
        </Card>  
    )
}