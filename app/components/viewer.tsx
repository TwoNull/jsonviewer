import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";

const itemClasses = {
    title: "text-xs"
}

export default function Viewer(props: {object: any}) {

    function renderAccordionItems(data: any) {
        return Object.entries(data).map(([key, value]) => (
            <AccordionItem key={key} title={key}>
                {typeof value === 'object' && value !== null ? (
                    <Accordion itemClasses={itemClasses} isCompact>{renderAccordionItems(value)}</Accordion>
                ) : (
                    <p className="pl-2 text-xs">{String(value)}</p>
                )}
            </AccordionItem>
        ));
    }

    function renderAccordion(data: any) {
        return Object.entries(data).map(([key, value]) => {
            switch(typeof value) {
                case "object":
                    return (
                        <Accordion itemClasses={itemClasses} isCompact>
                            <AccordionItem key={key} title={key}>
                                {renderAccordion(value)}
                            </AccordionItem>
                        </Accordion>
                    )
                default:
                    return <span className="text-xs pl-2">{key + ": " + String(value)}</span>
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