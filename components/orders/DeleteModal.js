import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
export default function DeleteModal({ action }) {
  const { refresh } = useRouter();
  const deleteUser = async () => {
    const pb = new PocketBase(
      "http://" +
        (process.env.NODE_ENV === "production"
          ? "sewing_api:8080"
          : "127.0.0.1:8090") +
        ""
    );
    await pb.collection("orders").delete(action.current);
    refresh();
  };
  return (
    <div
      className="modal fade"
      tabindex="-1"
      id="delete"
      aria-labelledby="delete_label"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Are you sure you want to delete this Order ?
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p style={{ textAlign: "left" }}>
              If you click delete. This Order will no longer exists{" "}
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={deleteUser}
              data-bs-dismiss="modal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
