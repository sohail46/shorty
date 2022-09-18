const Validator = require('validatorjs');
const { URL } = require('url');
const { QueryTypes } = require('sequelize');
const Shortlink = require('./../models/shortlinkModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { validationErrorToString } = require('./../utils/validation');
const sequelize = require('../sequelize');

const tagsToArray = (shortlinks) => {
  shortlinks.map((shortlink) => {
    shortlink.tags = shortlink.tags
      ? shortlink.tags.split(',')
      : shortlink.tags;
    return shortlink;
  });
};

const isValidUrl = (url) => {
  try {
    if (new URL(url)) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

exports.createShortlink = catchAsync(async (req, res, next) => {
  const rules = {
    shortlink: 'required|alpha_dash|between:1,50',
    description: 'required|between:1,250',
    url: 'required|url',
    tags: 'array',
  };

  const input = {
    ...req.body,
    user_id: req.user.id,
    status: 'active',
  };

  const validation = new Validator(input, rules);
  if (validation.fails()) {
    return next(new AppError(validationErrorToString(validation), 400));
  }

  if (!isValidUrl(input.url)) {
    return next(new AppError('Invalid url!', 400));
  }

  if (input.tags) {
    input.tags = input.tags.join(',');
  }

  const shortlinkExist = await Shortlink.findOne({
    where: { user_id: input.user_id, shortlink: input.shortlink },
  });
  if (shortlinkExist) {
    return next(new AppError('This shortlink already exists!', 409));
  }

  const newShortlink = await Shortlink.create(input, { returning: true });

  tagsToArray([newShortlink]);

  res.status(201).json({
    status: 'success',
    data: newShortlink,
  });
});

exports.getAllShortlinks = catchAsync(async (req, res, next) => {
  const { query } = req;

  const rules = {
    sort_by: [{ in: ['shortlink', 'description', 'created_at'] }],
    sort_type: [{ in: ['desc', 'asc'] }],
  };

  const validation = new Validator(query, rules);
  if (validation.fails()) {
    return next(new AppError(validationErrorToString(validation), 400));
  }

  const filter = {
    where: { user_id: req.user.id, status: 'active' },
  };

  if (query.sort_by) {
    const sortType = query.sort_type ? query.sort_type : 'asc';
    filter.order = [[query.sort_by, sortType]];
  }

  const shortlinks = await Shortlink.findAll(filter);

  tagsToArray(shortlinks);

  res.status(200).json({
    status: 'success',
    data: shortlinks,
  });
});

exports.deleteShortlink = catchAsync(async (req, res, next) => {
  const shortlink = await Shortlink.destroy({ where: { id: req.params.id } }); //hard delete

  // for soft delete update status to inactive
  //   const shortlink = await Shortlink.update(
  //     { status: 'inactive' },
  //     { where: { id: req.params.id } }
  //   );

  if (!shortlink) {
    return next(new AppError('No shortlink found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
  });
});

exports.searchShortlink = catchAsync(async (req, res, next) => {
  const rules = {
    input: 'alpha_dash',
  };

  const validation = new Validator(req.query, rules);
  if (validation.fails()) {
    return next(new AppError(validationErrorToString(validation), 400));
  }

  const { input } = req.query;
  let shortlinks = [];

  if (input) {
    const query = `SELECT * FROM shortlinks
    WHERE ( MATCH(shortlink, description, tags) AGAINST ('*${input}*' IN BOOLEAN MODE))
    AND user_id = '${req.user.id}' AND status = 'active'`;

    shortlinks = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    tagsToArray(shortlinks);
  }

  res.status(200).json({
    status: 'success',
    data: shortlinks,
  });
});
