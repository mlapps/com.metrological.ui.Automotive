export const addTransitions = (properties, transition) => {
    const transitions = {};
    for (const key of properties) {
        transitions[key] = transition;
    }
    return transitions;
}