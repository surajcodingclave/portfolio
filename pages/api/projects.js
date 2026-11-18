import { collectionHandler } from '../../lib/collectionHandler';

export default collectionHandler('projects', [
  'title', 'description', 'techStack', 'imageUrl', 'imageAlt', 'demoUrl', 'repoUrl',
], ['home', 'projects']);
