import { collectionHandler } from '../../lib/collectionHandler';

export default collectionHandler('experience', [
  'role', 'company', 'location', 'period', 'description', 'technologies',
], ['experience']);
