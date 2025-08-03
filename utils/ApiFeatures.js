class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filters() {
    const queryObj = { ...this.queryStr };
    const excludeQueries = ["page", "limit", "sort", "fields"];
    excludeQueries.forEach((param) => delete queryObj[param]);

    const regexQuery = {};

    Object.entries(queryObj).forEach(([key, value]) => {
      if (typeof value === "string" && !/^\d+$/.test(value)) {
        regexQuery[key] = { $regex: value, $options: "i" };
      } else {
        regexQuery[key] = value;
      }
    });

    this.query = this.query.find(regexQuery);

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const selectedField = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(selectedField);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  pagination() {
    const page = Number(this.queryStr.page) || 1;
    const limit = Number(this.queryStr.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
