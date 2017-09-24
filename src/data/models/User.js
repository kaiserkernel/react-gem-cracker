import * as DB from '../Database';
import * as HNDB from '../HNDataAPI';
import cache from '../Cache';

export default class User {
  constructor(props) {
    this.id = props.id;
    this.about = props.about || '';
    this.creationTime = props.creationTime || +new Date();
    this.dateOfBirth = props.dateOfBirth || null;
    this.email = props.email || null;
    this.firstName = props.firstName || null;
    this.hides = props.hides || [];
    this.karma = props.karma || 1;
    this.lastName = props.lastName || null;
    this.likes = props.likes || [];
    this.posts = props.posts || [];
    this.password = props.password || undefined;
  }

  static getUser = id => cache.getUser(id) || HNDB.fetchUser(id);

  static getPostsForUser = id => DB.getNewsItems()
    .filter(newsItem => newsItem.submitterId === id);

  static validPassword = (id, password) => {
    const user = cache.getUser(id);
    if (user) return user.password === password;
    return false;
  }

  static registerUser = ({ id, password }) => {
    if (id.length < 3 || id.length > 32) throw new Error('User ID must be between 3 and 32 characters.');
    if (password.length < 8 || password.length > 100) throw new Error('User password must be longer than 8 characters.');
    if (cache.getUser(id)) throw new Error('Username is taken.');
    const user = new User({
      id,
      password,
    });
    cache.setUser(user.id, user);
    return user;
  }
}
