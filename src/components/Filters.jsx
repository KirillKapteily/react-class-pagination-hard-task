import React, { Component } from "react";

class Filters extends Component {
  render() {
    const {
      users,
      searchQuery,
      selectedUserId,
      sortType,
      perPage,
      onSearchChange,
      onUserChange,
      onSortChange,
      onPerPageChange,
      onResetFilters,
    } = this.props;

    return (
      <div className="filters">
        <label>
          Search
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search by title..."
          />
        </label>

        <label>
          User
          <select value={selectedUserId} onChange={onUserChange}>
            <option value="all">All users</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort
          <select value={sortType} onChange={onSortChange}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title-az">Title A-Z</option>
            <option value="title-za">Title Z-A</option>
          </select>
        </label>

        <label>
          Per page
          <select value={perPage} onChange={onPerPageChange}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>

        <button onClick={onResetFilters}>Reset filters</button>
      </div>
    );
  }
}

export default Filters;
