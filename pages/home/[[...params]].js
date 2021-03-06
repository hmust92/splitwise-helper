import {
  append,
  filter,
  findIndex,
  pipe,
  pluck,
  propEq,
  reduce,
  uniq,
  update,
} from "ramda";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";

import IndividualOrderModal from "../../components/IndividualOrderModal";
import Input from "../../components/Input";
import ResultsModal from "../../components/ResultsModal";
import TableOrdersModal from "../../components/TableOrdersModal";
import styles from "../../styles/Home.module.css";

function makeId() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function Home() {
  const router = useRouter();

  const [subtotal, setSubtotal] = React.useState("");
  const [tax, setTax] = React.useState("");
  const [tip, setTip] = React.useState("");

  const [tableOrders, setTableOrders] = React.useState([]);
  const [individualOrders, setIndividualOrders] = React.useState([]);
  const [results, setResults] = React.useState([]);

  const calculate = (e) => {
    e.preventDefault();

    const multiplierPercentage =
      (100 * (parseFloat(tax) + parseFloat(tip))) / parseFloat(subtotal);
    const multiplier = 1 + multiplierPercentage / 100;

    const people = pipe(pluck("person"), uniq)(individualOrders);
    const totalSharedAmountPerPerson =
      tableOrders.reduce((acc, { amount }) => acc + amount, 0) / people.length;

    setResults(
      people.map((person) => {
        const totalIndividualAmountForPerson = pipe(
          filter(propEq("person", person)),
          reduce((acc, { amount }) => acc + amount, 0)
        )(individualOrders);

        return {
          id: makeId(),
          person,
          totalAmount:
            (totalIndividualAmountForPerson + totalSharedAmountPerPerson) *
            multiplier,
        };
      })
    );

    router.push("/home/[[...params]]", "/home/results", {
      scroll: false,
    });
  };

  return (
    <>
      <Head>
        <title>Splitwise Helper</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div>
          <div>
            <h3 style={{ textAlign: "center", margin: 0 }}>Subtotal</h3>
            <Input
              name="subTotalAmount"
              value={subtotal}
              onChange={(e) => {
                setSubtotal(e.target.value);
              }}
              style={{
                marginTop: 10,
                width: "100%",
              }}
              placeholder="Your Subtotal"
            />
            <h3 style={{ textAlign: "center", margin: "10px 0px 0px 0px" }}>
              Tax
            </h3>
            <Input
              name="taxAmount"
              value={tax}
              onChange={(e) => {
                setTax(e.target.value);
              }}
              style={{
                marginTop: 10,
                width: "100%",
              }}
              placeholder="Your Tax"
            />
            <h3 style={{ textAlign: "center", margin: "10px 0px 0px 0px" }}>
              Tip
            </h3>
            <Input
              name="tipAmount"
              value={tip}
              onChange={(e) => {
                setTip(e.target.value);
              }}
              style={{
                marginTop: 10,
                width: "100%",
              }}
              placeholder="Your Tip"
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <h2 style={{ flex: 1 }}>Orders For The Table</h2>
            <button
              style={{ height: "fit-content" }}
              onClick={(e) => {
                e.preventDefault();
                router.push("/home/[[...params]]", "/home/tableOrder", {
                  scroll: false,
                });
              }}
            >
              Add
            </button>
          </div>
          <ul style={{ marginTop: 0 }}>
            {tableOrders.map(({ id, amount }) => (
              <li key={id}>
                <div style={{ display: "flex" }}>
                  <div>${amount}</div>
                  <button
                    style={{
                      fontSize: 12,
                      color: "blue",
                      padding: 0,
                      borderStyle: "none",
                      background: "transparent",
                      marginLeft: 5,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        "/home/[[...params]]",
                        `/home/tableOrder/${id}`,
                        {
                          scroll: false,
                        }
                      );
                    }}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ flex: 1 }}>Individual Orders</h2>
            <button
              style={{ height: "fit-content" }}
              onClick={(e) => {
                e.preventDefault();
                router.push("/home/[[...params]]", "/home/individualOrder", {
                  scroll: false,
                });
              }}
            >
              Add
            </button>
          </div>
          <ul style={{ marginTop: 0 }}>
            {individualOrders.map(({ id, amount, person }) => (
              <li key={id}>
                <div style={{ display: "flex" }}>
                  <div>
                    ${amount} ({person})
                  </div>
                  <button
                    style={{
                      fontSize: 12,
                      color: "blue",
                      padding: 0,
                      borderStyle: "none",
                      background: "transparent",
                      marginLeft: 5,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        "/home/[[...params]]",
                        `/home/individualOrder/${id}`,
                        {
                          scroll: false,
                        }
                      );
                    }}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
        >
          <button onClick={calculate}>Calculate</button>
        </div>
      </div>

      <TableOrdersModal
        isOpen={router.query.params?.[0] === "tableOrder"}
        onRequestClose={() => {
          router.back();
        }}
        onSubmit={(tableOrderAmount) => {
          const tableOrderId = router.query.params?.[1];
          if (tableOrderId) {
            const index = findIndex(propEq("id", tableOrderId))(tableOrders);
            setTableOrders(
              update(index, {
                id: tableOrderId,
                amount: parseFloat(tableOrderAmount),
              })
            );
          } else {
            setTableOrders(
              append({
                id: makeId(),
                amount: parseFloat(tableOrderAmount),
              })
            );
          }
          router.back();
        }}
        tableOrders={tableOrders}
      />

      <IndividualOrderModal
        isOpen={router.query.params?.[0] === "individualOrder"}
        onRequestClose={() => {
          router.back();
        }}
        onSubmit={({ amount, person }) => {
          const individualOrderId = router.query.params?.[1];
          if (individualOrderId) {
            const index = findIndex(propEq("id", individualOrderId))(
              individualOrders
            );
            setIndividualOrders(
              update(index, {
                id: individualOrderId,
                person,
                amount: parseFloat(amount),
              })
            );
          } else {
            setIndividualOrders(
              append({
                id: makeId(),
                person,
                amount: parseFloat(amount),
              })
            );
          }
          router.back();
        }}
        individualOrders={individualOrders}
      />

      <ResultsModal
        isOpen={router.query.params?.[0] === "results"}
        onRequestClose={() => {
          router.back();
        }}
        results={results}
      />
    </>
  );
}
