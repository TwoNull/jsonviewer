import { Fragment } from "react";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";

export default function Viewer(props: {object: any}) {

    function renderAccordionItems(data: any) {
        return Object.entries(data).map(([key, value]) => (
            <AccordionItem key={key} title={key}>
                {typeof value === 'object' && value !== null ? (
                    <Accordion isCompact >{renderAccordionItems(value)}</Accordion>
                ) : (
                    <Fragment>{String(value)}</Fragment>
                )}
            </AccordionItem>
        ));
    }

    return (
        <Card>
            <CardBody>
                <Accordion isCompact>
                    {renderAccordionItems(props.object)}
                </Accordion>
            </CardBody>
        </Card>  
    )
}