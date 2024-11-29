package com.artlink.actions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static com.artlink.enums.ActionType.*;

@Service
public class ActionReverserFactory {
    private final ModifiedActionReverser modifiedActionReverser;
    private final AddedActionReverser addedActionReverser;
    private final DeletedActionReverser deletedActionReverser;

    @Autowired
    public ActionReverserFactory(
            ModifiedActionReverser modifiedActionReverser,
            AddedActionReverser addedActionReverser,
            DeletedActionReverser deletedActionReverser
    ) {
        this.modifiedActionReverser = modifiedActionReverser;
        this.addedActionReverser = addedActionReverser;
        this.deletedActionReverser = deletedActionReverser;
    }
    public IActionReverser createActionReverser(String actionType) {
        return switch (actionType) {
            case MODIFY -> modifiedActionReverser;
            case ADD -> addedActionReverser;
            case DELETE -> deletedActionReverser;
            default -> throw new IllegalArgumentException("Unsupported action type: " + actionType);
        };
    }
}