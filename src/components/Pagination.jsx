import { useState } from "react";

export default function name({currentPage,
      totalPages,
      onPageChange,
      onNextPage,
      onPreviousPage,
    }) {
  
 const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

return (
      <div className="pagination">
        <button onClick={onPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}

        <button onClick={onNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
}

// import React, { Component } from "react";

// class Pagination extends Component {
//   getPageNumbers = () => {
//     const { totalPages } = this.props;

//     return Array.from({ length: totalPages }, (_, index) => index + 1);
//   };

//   render() {
//     const {
//       currentPage,
//       totalPages,
//       onPageChange,
//       onNextPage,
//       onPreviousPage,
//     } = this.props;

//     return (
//       <div className="pagination">
//         <button onClick={onPreviousPage} disabled={currentPage === 1}>
//           Previous
//         </button>

//         {this.getPageNumbers().map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             disabled={currentPage === page}
//           >
//             {page}
//           </button>
//         ))}

//         <button onClick={onNextPage} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     );
//   }
// }

// export default Pagination;
