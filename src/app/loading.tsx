const styles = {
    container: "flex items-center justify-center py-20",
    skeleton: "animate-pulse bg-slate-200 rounded h-6 w-48",
  };

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.skeleton} />
    </div>
  );
}
