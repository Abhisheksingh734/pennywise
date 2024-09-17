// import React from "react";
import { Card, Row } from "antd";
import "./styles.css";
import Button from "../Button";

function Cards({
  income,
  expense,
  totalBalance,
  showExpenseModal,
  showIncomeModal,
}) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card " title="Current Balance">
          <p>${totalBalance}</p>
          <Button text={"Reset Balance"} blue={true} />
        </Card>

        <Card
          className="my-card"
          title="Total Income"
          onClick={showIncomeModal}
        >
          <p>${income}</p>
          <Button text={"Add Income"} blue={true} />
        </Card>
        <Card
          className="my-card"
          title="Total Expenses"
          onClick={showExpenseModal}
        >
          <p>${expense}</p>
          <Button text={"Add Expences"} blue={true} />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
