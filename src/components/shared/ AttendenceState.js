export class AttendenceState {
    static wait = new AttendenceState(0)
    static approved = new AttendenceState(1)
    static refused = new AttendenceState(2)

    AttendenceState(index) {
        this.index = index;
    }
}