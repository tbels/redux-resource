import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: read:', function() {
  describe('READ_RESOURCES_SUCCESS:', () => {
    it('returns the right state without a label, without IDs', () => {
      const initialState = {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        labels: {
          pasta: {
            hungry: true
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          }
        }
      };

      const reducer = resourceReducer('hellos', {initialState});

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEED',
        resourceName: 'hellos'
      });

      expect(reduced).to.deep.equal(initialState);
    });

    it('returns state with resource array, no label, default options', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4, lastName: 'camomile'},
          ],
          labels: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
          {id: 3},
          {id: 4, name: 'sandwiches', lastName: 'camomile'},
          {id: 5}
        ],
        labels: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('returns state with resource array, no label, mergeResources: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4, lastName: 'camomile'},
          ],
          labels: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        mergeResources: false,
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
          {id: 3},
          {id: 4, name: 'sandwiches'},
          {id: 5}
        ],
        labels: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('returns state with resource array, no label, mergeMeta: false', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4, lastName: 'camomile'},
          ],
          labels: {},
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        mergeMeta: false,
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
          {id: 3},
          {id: 4, name: 'sandwiches', lastName: 'camomile'},
          {id: 5}
        ],
        labels: {},
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('returns state with resource array and label, ensuring no label ID dupes', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4, lastName: 'camomile'},
          ],
          labels: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [4],
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        requestLabel: 'pasta',
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
          {id: 3},
          {id: 4, name: 'sandwiches', lastName: 'camomile'},
          {id: 5}
        ],
        labels: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [4, 5],
            status: requestStatuses.SUCCEEDED
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('returns state with resource array and label, ensuring empty label IDs works', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4, lastName: 'camomile'},
          ],
          labels: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        requestLabel: 'pasta',
        resources: [
          {id: 4, name: 'sandwiches'},
          5
        ]
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
          {id: 3},
          {id: 4, name: 'sandwiches', lastName: 'camomile'},
          {id: 5}
        ],
        labels: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [4, 5],
            status: requestStatuses.SUCCEEDED
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          },
          5: {
            createStatus: requestStatuses.NULL,
            readStatus: requestStatuses.SUCCEEDED,
            updateStatus: requestStatuses.NULL,
            deleteStatus: requestStatuses.NULL,
          }
        }
      });
    });

    it('returns state without a resource array, with a label', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4, lastName: 'camomile'},
          ],
          labels: {
            sandwiches: {
              ids: [1, 3],
              status: requestStatuses.FAILED
            },
            pasta: {
              ids: [1],
              status: requestStatuses.PENDING
            }
          },
          meta: {
            1: {
              name: 'what'
            },
            3: {
              deleteStatus: 'sandwiches'
            },
            4: {
              selected: true
            }
          }
        }
      });

      const reduced = reducer(undefined, {
        type: 'READ_RESOURCES_SUCCEED',
        resourceName: 'hellos',
        requestLabel: 'pasta',
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
          {id: 3},
          {id: 4, lastName: 'camomile'},
        ],
        labels: {
          sandwiches: {
            ids: [1, 3],
            status: requestStatuses.FAILED
          },
          pasta: {
            ids: [1],
            status: requestStatuses.SUCCEEDED
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          },
          4: {
            selected: true,
          }
        }
      });
    });
  });
});
