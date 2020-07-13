import ForgeUI, { render, Fragment, Text, Button, ButtonSet, useState, useProductContext } from "@forge/ui";
import api from "@forge/api";

const { SENTIMENT_API_KEY, DEBUG_LOGGING } = process.env;

const OPTIONS = [
  ['Quote', 'en'],
];

const Panel = () => {
  const { platformContext: { issueKey } } = useProductContext();
  const [fact, setFact] = useState(null);

  async function setFacts(countryCode) {
    const response = await api.fetch(`http://quotes.rest/qod.json?category=inspire`);
    const list = (await response.json());
    console.log(list.contents.quotes);
    const fs = list.contents.quotes[0].quote;
    setFact({
      fact:fs,
    });
  }
  
  // Render the UI
  return (
    <Fragment>
      <ButtonSet>
        {OPTIONS.map(([label, code]) =>
          <Button
            text={label}
            onClick={async () => { await setFacts(code); }}
          />
        )}
      </ButtonSet>
      {fact && (
        <Fragment>
          <Text content={fact.fact} />
        </Fragment>
      )}
    </Fragment>
  );
};


export const run = render(<Panel />);
