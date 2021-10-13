import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Colors } from '../colors';
import { Node } from '../node';


@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnChanges {

    /** The color of the node */
    @Input() node: Node;

    /** Determines if this is the root node */
    @Input() rootNode = false;

    /** The parent value to listen to */
    @Input() parentValue: number;

    /** Tells the parent to delete this node */
    @Output() deleteNode = new EventEmitter<void>();

    constructor() { }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.parentValue && simpleChange.parentValue.currentValue !== simpleChange.parentValue.previousValue && !this.rootNode) {
            this.node.value = simpleChange.parentValue.currentValue + (this.node.color === Colors.green ? 2 : 1);
            console.log(this.node.value);
        }
    }

    /** Add a new node to this nodes children */
    addNode() {
        this.node.children.push({ value: this.node.value + 1, color: Colors.red, children: [] });
    }

    /** Delete a child node */
    deleteChild(index: number) {
        this.node.children.splice(index, 1);
    }

    /** Determines if this node is able to be deleted by checking the color of this and all children nodes */
    recursiveCheck(node: Node): boolean {
        let allGreen = true;
        if (node.color === Colors.green) {
            if (node.children.length) {
                node.children.forEach(child => {
                    if (!this.recursiveCheck(child)) {
                        allGreen = false;
                    }
                });
            }
        } else {
            allGreen = false;
        }

        return allGreen;

    }

    /** Flips the color of this node and updates the score */
    flipColor() {
        if (this.node.color === Colors.red) {
            this.node.color = Colors.green;
            this.node.value += 1;
        } else if (this.node.color === Colors.green) {
            this.node.color = Colors.red;
            this.node.value -= 1;
        }
    }
}
