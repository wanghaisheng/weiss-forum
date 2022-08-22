'use strict';
const config = require('./config');
const validator = require('validator');

const thinky = require('thinky')(config.api);
const r = thinky.r;
const type = thinky.type;

const User = thinky.createModel('users', {
  slug: type.string(),
  name: type.string().required(),
  username: type.string().required(),
  email: type.string().required(validator.isEmail),
  phone: type.string(),
  password: type.string().required(),
  photo: type.string(),
  country: type.string(),
  state: type.string(),
  city: type.string(),
  zipCode: type.string(),
  coin: type.number().default(0),
  role: type.string().enum(['member', 'moderator', 'admin']).default('member'),
  status: type
    .string()
    .enum(['pending', 'active', 'banned', 'suspended'])
    .default('pending'),
  suspendDuration: type.date(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Category = thinky.createModel('categories', {
  slug: type.string(),
  title: type.string(),
  description: type.string(),
  color: type.string(),
  moderators: type.array().default([]),
  authRequired: type.boolean().default(false),
  status: type.boolean().default(true),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Discussion = thinky.createModel('discussions', {
  slug: type.string(),
  title: type.string(),
  content: type.string(),
  type: type.string().enum(['general', 'question']),
  status: type
    .string()
    .enum(['answered', 'unanswered', 'banned'])
    .default('unanswered'),
  userId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Comment = thinky.createModel('comments', {
  slug: type.string(),
  content: type.string(),
  type: type.string().enum(['comment', 'reply']),
  status: type
    .string()
    .enum(['answer', 'flag', 'normal'])
    .default('unanswered'),
  replyId: type.string(),
  userId: type.string(),
  discussionId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Notification = thinky.createModel('notifications', {
  slug: type.string(),
  message: type.string(),
  sender: type.string(),
  receiver: type.string(),
  action: type.string(),
  read: type.boolean().default(false),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Upload = thinky.createModel('uploads', {
  slug: type.string(),
  relative: type.string().enum(['logo', 'user', 'discussion']),
  file: type.string(),
  filetype: type.string().enum(['image', 'document']),
  userId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Settings = thinky.createModel('settings', {
  meta: type.object(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Pageview = thinky.createModel('pageviews', {
  url: type.string(),
  referrer: type.string(),
  type: type.string().enum(['view', 'click']).default('view'),
  ipAddress: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

//Associations
Discussion.belongsTo(User, 'profile', 'userId', 'id');
Comment.belongsTo(User, 'author', 'userId', 'id');

User.ensureIndex('slug');
User.ensureIndex('name');
User.ensureIndex('email');
User.ensureIndex('phone');
User.ensureIndex('country');
User.ensureIndex('state');
User.ensureIndex('city');
User.ensureIndex('status');
User.ensureIndex('photo');
User.ensureIndex('role');
User.ensureIndex('createdAt');
User.ensureIndex('updatedAt');

Category.ensureIndex('slug');
Category.ensureIndex('title');
Category.ensureIndex('description');
Category.ensureIndex('authRequired');
Category.ensureIndex('moderatorId');
Category.ensureIndex('status');
Category.ensureIndex('createdAt');
Category.ensureIndex('updatedAt');

Discussion.ensureIndex('slug');
Discussion.ensureIndex('title');
Discussion.ensureIndex('content');
Discussion.ensureIndex('type');
Discussion.ensureIndex('color');
Discussion.ensureIndex('moderators');
Discussion.ensureIndex('userId');
Discussion.ensureIndex('createdAt');
Discussion.ensureIndex('updatedAt');

Comment.ensureIndex('discussionId');
Comment.ensureIndex('slug');
Comment.ensureIndex('content');
Comment.ensureIndex('type');
Comment.ensureIndex('status');
Comment.ensureIndex('replyId');
Comment.ensureIndex('userId');
Comment.ensureIndex('createdAt');
Comment.ensureIndex('updatedAt');

Notification.ensureIndex('slug');
Notification.ensureIndex('message');
Notification.ensureIndex('sender');
Notification.ensureIndex('receiver');
Notification.ensureIndex('read');
Notification.ensureIndex('action');
Notification.ensureIndex('createdAt');
Notification.ensureIndex('updatedAt');

Settings.ensureIndex('meta');
Settings.ensureIndex('createdAt');
Settings.ensureIndex('updatedAt');

Upload.ensureIndex('slug');
Upload.ensureIndex('relative');
Upload.ensureIndex('file');
Upload.ensureIndex('fileType');
Upload.ensureIndex('UserId');
Upload.ensureIndex('createdAt');
Upload.ensureIndex('updatedAt');

Pageview.ensureIndex('url');
Pageview.ensureIndex('referrer');
Pageview.ensureIndex('ipAddress');
Pageview.ensureIndex('type');
Pageview.ensureIndex('createdAt');
Pageview.ensureIndex('updatedAt');

export {
  r,
  User,
  Category,
  Discussion,
  Comment,
  Notification,
  Upload,
  Settings
};
