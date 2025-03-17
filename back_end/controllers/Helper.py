def extractTokensInName(name):
    voyelles = "aeiouy"
    syllabes = []
    syllabe = ""

    for i, char in enumerate(name.lower()):
        syllabe += char
        if char in voyelles:
            if i + 1 == len(name) or name[i + 1].lower() not in voyelles:
                syllabes.append(syllabe)
                syllabe = "" 

    if syllabe:
        syllabes.append(syllabe)

    return syllabes


def syllablesToString(tokens):
    return ' '.join(tokens)