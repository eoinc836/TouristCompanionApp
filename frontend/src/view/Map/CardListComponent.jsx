import React, { useState } from "react";

const CardListComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([
    // Initial card data
    { id: 1, title: "Card 1", description: "Card 1 Description" },
    { id: 2, title: "Card 2", description: "Card 2 Description" },
    { id: 3, title: "Card 3", description: "Card 3 Description" },
    { id: 4, title: "Card 4", description: "Card 4 Description" },
    { id: 5, title: "Card 5", description: "Card 5 Description" },
    { id: 6, title: "Card 6", description: "Card 6 Description" },
    // ...
  ]);

  const cardsPerPage = 6; // Number of cards to display per page

  // Calculate the range of cards for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  // Handle click event for page numbers
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Simulate the operation of loading more cards
  const loadMoreCards = () => {
    // Simulate asynchronous data retrieval
    setTimeout(() => {
      // Assume new card data is retrieved from the server
      const newCards = [
        // New card data
        { id: 1, title: "Card 1", description: "Card 1 Description" },
        { id: 2, title: "Card 2", description: "Card 2 Description" },
        { id: 3, title: "Card 3", description: "Card 3 Description" },
        { id: 4, title: "Card 4", description: "Card 4 Description" },
        { id: 5, title: "Card 5", description: "Card 5 Description" },
        { id: 6, title: "Card 6", description: "Card 6 Description" },
        // ...
      ];

      // Update the card data list
      setCards([...cards, ...newCards]);
    }, 1000); // Assume loading card data takes 1 second
  };

  return (
    <div>
      <div className="card-list">
        {currentCards.map((card) => (
          <div className="card" key={card.id}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.description}</p>
              <a href="#" className="btn btn-primary">
                view details
              </a>
            </div>
          </div>
        ))}
      </div>
      {cards.length > currentCards.length && (
        <div className="pagination">
          {Array.from(Array(Math.ceil(cards.length / cardsPerPage)).keys()).map(
            (pageNumber) => (
              <button
                key={pageNumber + 1}
                className={currentPage === pageNumber + 1 ? "active" : ""}
                onClick={() => handlePageClick(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            )
          )}
        </div>
      )}
      {cards.length > currentCards.length && (
        <div className="load-more">
          <button onClick={loadMoreCards}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default CardListComponent;
